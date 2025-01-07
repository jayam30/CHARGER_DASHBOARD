
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Import the useRouter hook
// import { ChevronLeft, ChevronRight, Info, IndianRupee } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useChargingStatus } from "@/hooks/useChargingStatus";
// import { ref, update } from "firebase/database";
// import { database } from "@/config/firebase";
// import ChargingPadWarning from "@/components/FodDialog";
// import { useBMSData } from "@/hooks/useBMSData";
// import { toast } from "sonner";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from "@/components/ui/tooltip";

// export default function MoneySelectionPage() {
//   const [amount, setAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter(); // Initialize the router
//   const { status, updateChargingStatus, resetChargingStatus } = useChargingStatus();
 

//   const formatNumber = (num: number) => `₹${num.toFixed(2)}`;

//   const incrementValue = () => setAmount((prev) => prev + 1);

//   const decrementValue = () => setAmount((prev) => (prev > 0 ? prev - 1 : 0));

//   const handleQuickSelect = (value: number) => setAmount(value);

//   const handleSelect = async () => {
//     if (amount === 0) {
//       toast.error("Please select a valid amount");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Replace with actual Firebase logic
//       toast.success(`Amount selected: ${formatNumber(amount)}`);
//       router.push("/charge"); // Redirect to the charge page
//     } catch (error) {
//       console.error("Error selecting amount:", error);
//       toast.error("Failed to select amount");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  



//   return (
//     <div
//       className="w-[768px] h-[1024px] overflow-hidden bg-transparent font-sans pt-7"
//       style={{
//         backgroundImage: "url(/money-bg.png)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="flex justify-center items-center p-1 pt-40 w-full px-8">
//         <Card className="w-full max-w-md bg-transparent border-none">
//           <CardContent className="border-none p-8">
//             <div className="flex flex-col items-center space-y-8">
//               {/* Header */}
//               <div className="flex items-center space-x-3">
//                 <IndianRupee className="w-8 h-8 text-red-500" />
//                 <span className="text-xl font-semibold text-white">
//                   Select Amount
//                 </span>
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <Info className="w-5 h-5 text-neutral-400" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Select the amount you want to contribute or pay.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </div>

//               {/* Quick Select Buttons */}
//               <div className="flex gap-2 w-full justify-center">
//                 {[100, 500, 1000, 5000].map((value) => (
//                   <Button
//                     key={value}
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleQuickSelect(value)}
//                     className={`px-3 py-1 text-sm ${
//                       amount === value
//                         ? "bg-red-500 text-white border-red-500"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     {`₹${value}`}
//                   </Button>
//                 ))}
//               </div>

//               {/* Amount Selection */}
//               <div className="flex items-center justify-center w-full space-x-8">
//                 <Button
//                   variant="outline"
//                   className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
//                   onClick={decrementValue}
//                 >
//                   <ChevronLeft className="w-24 h-24 stroke-2" />
//                 </Button>

//                 <div className="text-7xl font-bold text-white">
//                   {formatNumber(amount)}
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
//                   onClick={incrementValue}
//                 >
//                   <ChevronRight className="w-24 h-24 stroke-2" />
//                 </Button>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center w-full">
//                 <Button
//                   className="w-40 h-12 text-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
//                   onClick={handleSelect}
//                   disabled={isLoading || amount === 0}
//                 >
//                   {isLoading ? "Processing..." : "Confirm"}
//                 </Button>
//               </div>

//               {/* Helper Text */}
//               <div className="text-sm text-neutral-500">
//                 Selected Amount: {formatNumber(amount)}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
//jayam


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeft, ChevronRight, Info, IndianRupee } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
// import { useChargingStatus } from "@/hooks/useChargingStatus";
// import { useBMSData } from "@/hooks/useBMSData";
// import { ref, update } from "firebase/database";
// import { database } from "@/config/firebase";
// import ChargingPadWarning from "@/components/FodDialog";

// export default function MoneySelectionPage() {
//   const [amount, setAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { status, updateChargingStatus } = useChargingStatus();
//   const bmsData = useBMSData();

//   const isFodThere = bmsData?.isFodThere ?? false;
//   const isScootyParked = bmsData?.isReceiverCoilDetected ?? true;

//   const formatNumber = (num) => `₹${(Number(num ?? 0).toFixed(2))}`;


//   const incrementValue = () => setAmount((prev) => prev + 1);
//   const decrementValue = () => setAmount((prev) => (prev > 0 ? prev - 1 : 0));
//   const handleQuickSelect = (value) => setAmount(value);

//   const handleSelect = async () => {
//     if (amount === 0) {
//       toast.error("Please select a valid amount");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Update the amount in Firebase
//       const amountRef = ref(database, "Payment/latest");
//       await update(amountRef, { selectedAmount: amount });

//       // Initialize charging
//       const chargingSuccess = await updateChargingStatus(true);

//       if (chargingSuccess) {
//         toast.success(`Charging initialized for amount: ${formatNumber(amount)}`);
//         router.push("/charge");
//       } else {
//         toast.error("Failed to initialize charging");
//       }
//     } catch (error) {
//       console.error("Error initializing charging:", error);
//       toast.error("Failed to initialize charging");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (status.isChargingInitialized) return;

//     if (isFodThere) {
//       router.push("/fod-warning");
//       return;
//     }

//     if (!isScootyParked) {
//       router.push("/emergency-stop");
//       return;
//     }
//   }, [isFodThere, isScootyParked, status.isChargingInitialized, router]);

//   return (
//     <div
//       className="w-[768px] h-[1024px] overflow-hidden bg-transparent font-sans pt-7"
//       style={{
//         backgroundImage: "url(/money-bg.png)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="flex justify-center items-center p-1 pt-40 w-full px-8">
//         <ChargingPadWarning isFodThere={isFodThere} />
//         <Card className="w-full max-w-md bg-transparent border-none">
//           <CardContent className="border-none p-8">
//             <div className="flex flex-col items-center space-y-8">
//               <div className="flex items-center space-x-3">
//                 <IndianRupee className="w-8 h-8 text-red-500" />
//                 <span className="text-xl font-semibold text-white">
//                   Select Amount
//                 </span>
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <Info className="w-5 h-5 text-neutral-400" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Select the amount you want to contribute or pay.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </div>

//               <div className="flex gap-2 w-full justify-center">
//                 {[100, 500, 1000, 5000].map((value) => (
//                   <Button
//                     key={value}
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleQuickSelect(value)}
//                     className={`px-3 py-1 text-sm ${
//                       amount === value
//                         ? "bg-red-500 text-white border-red-500"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     {`₹${value}`}
//                   </Button>
//                 ))}
//               </div>

//               <div className="flex items-center justify-center w-full space-x-8">
//                 <Button
//                   variant="outline"
//                   className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
//                   onClick={decrementValue}
//                 >
//                   <ChevronLeft className="w-24 h-24 stroke-2" />
//                 </Button>

//                 <div className="text-7xl font-bold text-white">
//                   {formatNumber(amount)}
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="text-black hover:text-white hover:bg-neutral-950 transition-all duration-200 transform hover:scale-110"
//                   onClick={incrementValue}
//                 >
//                   <ChevronRight className="w-24 h-24 stroke-2" />
//                 </Button>
//               </div>

//               <div className="flex justify-center w-full">
//                 <Button
//                   className="w-40 h-12 text-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
//                   onClick={handleSelect}
//                   disabled={isLoading || amount === 0}
//                 >
//                   {isLoading ? "Processing..." : "Confirm"}
//                 </Button>
//               </div>

//               <div className="text-sm text-neutral-500">
//                 Selected Amount: {formatNumber(amount)}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

//with stop charing code

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Info, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useChargingStatus } from "@/hooks/useChargingStatus";
import { useBMSData } from "@/hooks/useBMSData";
import { ref, update } from "firebase/database";
import { database } from "@/config/firebase";
import ChargingPadWarning from "@/components/FodDialog";

export default function Page() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isChargingInitialized, setIsChargingInitialized] = useState(false);
  const [energy, setEnergy] = useState(0); // Accumulated energy in kWh
  const [targetEnergy, setTargetEnergy] = useState(0); // Target energy in kWh
  const router = useRouter();
  const { status, updateChargingStatus, resetChargingStatus } = useChargingStatus();
  const bmsData = useBMSData();

  const isFodThere = bmsData?.isFodThere ?? false;
  const isScootyParked = bmsData?.isReceiverCoilDetected ?? true;

  const formatNumber = (num) => `₹${(Number(num ?? 0).toFixed(2))}`;

  const incrementValue = () => setAmount((prev) => prev + 1);
  const decrementValue = () => setAmount((prev) => (prev > 0 ? prev - 1 : 0));
  const handleQuickSelect = (value) => setAmount(value);

  const handleSelect = async () => {
    if (amount === 0) {
      toast.error("Please select a valid amount");
      return;
    }
  
    setIsLoading(true);
    try {
      const amountRef = ref(database, "Payment/latest");
      await update(amountRef, { selectedAmount: amount });
  
      const calculatedTargetEnergy = amount / 30; // Assuming energy is derived from money
      const chargingSuccess = await updateChargingStatus(true, {
        hours: 0,
        minutes: 0,
        endTime: null, // Set the endTime if needed
      });
  
      if (chargingSuccess) {
        const targetEnergyRef = ref(database, "charging_status");
        console.log("Updating Firebase Target Energy:", calculatedTargetEnergy);
  
        await update(targetEnergyRef, { targetEnergy: calculatedTargetEnergy })
          .then(() => {
            console.log("Target Energy updated successfully in Firebase.");
          })
          .catch((error) => {
            console.error("Error updating target energy in Firebase:", error);
            throw error;
          });
  
        setTargetEnergy(calculatedTargetEnergy);
        setIsChargingInitialized(true);
        toast.success(`Charging initialized for amount: ${formatNumber(amount)}`);
        router.push("/charge");
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
  
  useEffect(() => {
    if (isChargingInitialized) {
      const interval = setInterval(() => {
        const voltage = bmsData?.voltage ?? 0;
        const current = bmsData?.current ?? 0;

        if (voltage > 0 && current > 0) {
          const calculatedPower = voltage * current; // Power in watts
          const powerInKW = calculatedPower / 1000; // Power in kW
          const energyIncrement = powerInKW / 3600; // Energy in kWh per second

          setEnergy((prev) => {
            const newEnergy = prev + energyIncrement;

            if (newEnergy >= targetEnergy) {
              setIsChargingInitialized(false); // Stop charging locally
              update(ref(database, "charging_status"), { isChargingInitialized: false }); // Update Firebase
              setEnergy(0); // Reset energy
              toast.success("Charging complete. Target energy reached.");
              router.push("/done"); // Redirect to done page
            }
            return newEnergy;
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isChargingInitialized, bmsData, targetEnergy, router]);

  useEffect(() => {
    if (!isChargingInitialized) return;

    if (isFodThere) {
      setIsChargingInitialized(false);
      router.push("/fod-warning");
      return;
    }

    if (!isScootyParked) {
      setIsChargingInitialized(false);
      router.push("/emergency-stop");
      return;
    }
  }, [isFodThere, isScootyParked, isChargingInitialized, router]);

  return (
    <div
      className="w-[768px] h-[1024px] overflow-hidden bg-transparent font-sans pt-7"
      style={{
        backgroundImage: "url(/money-bg.png)",
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
                <IndianRupee className="w-8 h-8 text-red-500" />
                <span className="text-xl font-semibold text-white">
                  Select Amount
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-5 h-5 text-neutral-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the amount you want to contribute or pay.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 w-full justify-center">
                {[100, 500, 1000, 5000].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSelect(value)}
                    className={`px-3 py-1 text-sm ${
                      amount === value
                        ? "bg-red-500 text-white border-red-500"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {`₹${value}`}
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
                  {formatNumber(amount)}
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
                  disabled={isLoading || amount === 0}
                >
                  {isLoading ? "Processing..." : "Confirm"}
                </Button>
              </div>

              <div className="text-sm text-neutral-500">
                Selected Amount: {formatNumber(amount)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
