
import { useState, useEffect, useRef } from "react";
import { ref, set, onValue, off } from "firebase/database";
import { database } from "@/config/firebase";
import { toast } from "sonner"; //last
import { useRouter } from "next/navigation"; //last
import { useBMSData } from "./useBMSData" //last

interface ChargingStatus {
  isChargingInitialized: boolean;
  duration: {
    hours: number;
    minutes: number;
    endTime?: number | null;
  };
  targetEnergy?: number; //last
}

export const useChargingStatus = () => {
  const [fodTriggered, setFodTriggered] = useState(false);
  const [misalignmentTriggered, setMisalignmentTriggered] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);
  //last
  const [energy, setEnergy] = useState(0);
  const router = useRouter();
  const bmsData = useBMSData();

//last

  const lastValidChargingState = useRef<ChargingStatus | null>(null);
  const [status, setStatus] = useState<ChargingStatus>({
    isChargingInitialized: false,
    duration: {
      hours: 0,
      minutes: 0,
      endTime: null,
    },
  });

  // Listen to charging status
  useEffect(() => {
    const chargingRef = ref(database, "charging_status");

    const onValueChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data: ChargingStatus = snapshot.val();
        
        // If no safety conditions are triggered
        if (!fodTriggered && !misalignmentTriggered && !emergencyStop) {
          setStatus(data);
          if (data.isChargingInitialized) {
            lastValidChargingState.current = data;
          }
        } else {
          // Store the current state if charging is active
          if (data.isChargingInitialized) {
            lastValidChargingState.current = data;
          }
          // Force charging to false during safety conditions
          setStatus(prev => ({
            ...prev,
            isChargingInitialized: false
          }));
        }
      }
    };

    onValue(chargingRef, onValueChange);
    return () => off(chargingRef, "value", onValueChange);
  }, [fodTriggered, misalignmentTriggered, emergencyStop]);

  // Handle safety conditions changes
  useEffect(() => {
    const safetyCleared = !fodTriggered && !misalignmentTriggered && !emergencyStop;
    
    if (safetyCleared && lastValidChargingState.current?.isChargingInitialized) {
      // Restore the last valid charging state
      updateChargingStatus(true, lastValidChargingState.current.duration);
    } else if (!safetyCleared) {
      // Force charging off when safety conditions are triggered
      updateChargingStatus(false);
    }
  }, [fodTriggered, misalignmentTriggered, emergencyStop]);

  // Listen to FOD status
  useEffect(() => {
    const fodRef = ref(database, "Is_FOD_Present");
    const onFODChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const newFodState = snapshot.val();
        setFodTriggered(newFodState);
      }
    };

    onValue(fodRef, onFODChange);
    return () => off(fodRef, "value", onFODChange);
  }, []);

  // Listen to misalignment status
  useEffect(() => {
    const misalignmentRef = ref(database, "isMisaligned");
    const onMisalignmentChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const newMisalignmentState = snapshot.val();
        setMisalignmentTriggered(newMisalignmentState);
      }
    };

    onValue(misalignmentRef, onMisalignmentChange);
    return () => off(misalignmentRef, "value", onMisalignmentChange);
  }, []);

  // Listen to emergency stop status
  useEffect(() => {
    const emergencyStopRef = ref(database, "emergencyStop");
    const onEmergencyStopChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const newEmergencyState = snapshot.val();
        setEmergencyStop(newEmergencyState);
      }
    };

    onValue(emergencyStopRef, onEmergencyStopChange);
    return () => off(emergencyStopRef, "value", onEmergencyStopChange);
  }, []);

  const updateChargingStatus = async (
    isCharging: boolean,
    duration?: { hours: number; minutes: number; endTime?: number | null }
  ) => {
    try {
      // Don't allow charging to be enabled if safety conditions aren't met
      if (isCharging && (fodTriggered || misalignmentTriggered || emergencyStop)) {
        return false;
      }

      const chargingRef = ref(database, "charging_status");
      const updatedStatus: ChargingStatus = {
        isChargingInitialized: isCharging,
        duration: duration
          ? {
              hours: duration.hours || 0,
              minutes: duration.minutes || 0,
              endTime: duration.endTime || null,
            }
          : status.duration,
      };

      await set(chargingRef, updatedStatus);
      return true;
    } catch (error) {
      console.error("Error updating charging status:", error);
      return false;
    }
  };

  const resetChargingStatus = async () => {
    try {
      lastValidChargingState.current = null;
      const chargingRef = ref(database, "charging_status");
      await set(chargingRef, {
        isChargingInitialized: false,
        duration: {
          hours: 0,
          minutes: 0,
          endTime: null,
        },
      });
      return true;
    } catch (error) {
      console.error("Error resetting charging status:", error);
      return false;
    }
  };

  return {
    status,
    updateChargingStatus,
    fodTriggered,
    misalignmentTriggered,
    emergencyStop,
    resetChargingStatus,
  };
};