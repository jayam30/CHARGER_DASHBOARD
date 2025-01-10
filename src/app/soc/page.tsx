"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Info, BatteryCharging } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useBMSData } from "@/hooks/useBMSData";
import { useChargingStatus } from "@/hooks/useChargingStatus";
import { ref, update } from "firebase/database";
import { database } from "@/config/firebase";
import ChargingPadWarning from "@/components/FodDialog";

export default function Page() {
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status, updateChargingStatus, resetChargingStatus } = useChargingStatus();
  const bmsData = useBMSData();

  const currentSOC = bmsData?.SOC || 0;
  const targetSOC = bmsData?.targetSOC || 0;
  const isFodThere = bmsData?.isFodThere ?? false;
  const isScootyParked = bmsData?.isReceiverCoilDetected ?? true;

  const formatPercentage = (num: number) => `${num}%`;

  const incrementValue = () => setPercentage((prev) => (prev < 100 ? prev + 1 : 100));
  const decrementValue = () => setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
  const handleQuickSelect = (value: number) => setPercentage(value);

  const handleSelect = async () => {
    if (percentage === 0) {
      toast.error("Please select a valid percentage");
      return;
    }

    if (percentage <= currentSOC) {
      toast.info("Battery is already at or above the selected SOC.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Setting target SOC to:", percentage);

      // Update the target SOC in Firebase
      const targetRef = ref(database, "BMSData/latest/targetSOC");
      await update(targetRef, { targetSOC: percentage });
      console.log("Target SOC updated successfully.");

      // Initialize charging
      const chargingSuccess = await updateChargingStatus(true);
      console.log("Charging status updated:", chargingSuccess);

      if (chargingSuccess) {
        toast.success(`Charging started to reach ${formatPercentage(percentage)}`);
        router.push("/charge");
        console.log("Redirecting to /charge");
      } else {
        toast.error("Failed to initialize charging");
      }
    } catch (error) {
      console.error("Error initializing charging:", error);
      toast.error("Failed to initialize charging");
    } finally {
      setIsLoading(false);
    }
  };

  // Monitor SOC and stop charging when target is reached
  useEffect(() => {
    if (status.isChargingInitialized && currentSOC >= targetSOC && targetSOC > 0) {
      const stopCharging = async () => {
        try {
          console.log("Target SOC reached. Stopping charging...");
          // Update charging_status to false
          const chargingRef = ref(database, "charging_status");
          await update(chargingRef, {
            isChargingInitialized: false,
            duration: {
              hours: status.duration.hours,
              minutes: status.duration.minutes,
              endTime: null, // Clear the endTime when charging stops
            },
          });

          // Reset charging status in the hook
          await resetChargingStatus();

          toast.success(`Charging completed: ${formatPercentage(targetSOC)}`);
          router.push("/charge");
          console.log("Redirecting to /charge after stopping charging");
        } catch (error) {
          console.error("Error stopping charging:", error);
          toast.error("Failed to stop charging");
        }
      };

      stopCharging();
    }
  }, [currentSOC, targetSOC, status.isChargingInitialized, resetChargingStatus, router]);

  // Handle redirections for FOD and scooty park, only when not charging
  useEffect(() => {
    if (!status.isChargingInitialized) {
      if (isFodThere) {
        router.push("/fod-warning");
        return;
      }
      if (!isScootyParked) {
        router.push("/emergency-stop");
        return;
      }
    }
  }, [isFodThere, isScootyParked, status.isChargingInitialized, router]);

  return (
    <div
      className="w-[768px] h-[1024px] overflow-hidden bg-transparent font-sans pt-7"
      style={{
        backgroundImage: "url(/soc-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center p-1 pt-40 w-full px-8">
        <ChargingPadWarning isFodThere={isFodThere} />
        <Card className="w-full max-w-md bg-transparent border-none">
          <CardContent className="border-none p-8">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-3">
                <BatteryCharging className="w-8 h-8 text-red-500" />
                <span className="text-xl font-semibold text-white">
                  Select SOC
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-5 h-5 text-neutral-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the percentage of battery charge you want.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 w-full justify-center">
                {[25, 50, 75, 100].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(value)}
                    className={`px-3 py-1 text-sm ${
                      percentage === value
                        ? "bg-red-500 text-white border-red-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {`${value}%`}
                  </Button>
                ))}
              </div>

              <div className="flex items-center justify-center w-full space-x-8">
                <Button
                  variant="outline"
                  className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
                  onClick={decrementValue}
                >
                  <ChevronLeft className="w-24 h-24 stroke-2" />
                </Button>

                <div className="text-7xl font-bold text-white">
                  {formatPercentage(percentage)}
                </div>

                <Button
                  variant="outline"
                  className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
                  onClick={incrementValue}
                >
                  <ChevronRight className="w-24 h-24 stroke-2" />
                </Button>
              </div>

              <div className="flex justify-center w-full">
                <Button
                  className="w-40 h-12 text-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  onClick={handleSelect}
                  disabled={isLoading || percentage === 0}
                >
                  {isLoading ? "Processing..." : "Confirm"}
                </Button>
              </div>

              <div className="text-sm text-neutral-500">
                Current SOC: {formatPercentage(currentSOC)} | Target SOC: {formatPercentage(percentage)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}