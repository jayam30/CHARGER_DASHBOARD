////////////////////////starting new//////////////////////////////////////////////

import { useState, useEffect, useRef } from "react";
import { ref, set, onValue, off, get } from "firebase/database";
import { database } from "@/config/firebase";

interface ChargingStatus {
  isChargingInitialized: boolean;
  duration: {
    hours: number;
    minutes: number;
    endTime?: number;
  };
}
// add status in contextApi instead of hook for a global store
// instead of fetching data from db , use the newly created store to 
// in updateChargingStatus change setStatus to its equivalent contextApi version updater

export const useChargingStatus = () => {
  const [status, setStatus] = useState<ChargingStatus>({
    isChargingInitialized: false,
    duration: { hours: 0, minutes: 0 },
  });

  // const [status, setStatus] = useState<ChargingStatus | null>(null);

  // useEffect(() => {
  //   const statusRef = ref(database, "chargingStatus"); // Update the path as per your Firebase structure

  //   const unsubscribe = onValue(statusRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       setStatus(data);
  //     } else {
  //       // Set a fallback default value if no data exists in the database
  //       setStatus({
  //         isChargingInitialized: false,
  //         duration: { hours: 0, minutes: 0 },
  //       });
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => {
  //     off(statusRef);
  //   };
  // }, []);

  const [fodTriggered, setFodTriggered] = useState(false);
  const [misalignmentTriggered, setMisalignmentTriggered] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);

  const lastValidChargingState = useRef<ChargingStatus | null>(null);

  // Monitor and update charging status
  useEffect(() => {
    const chargingRef = ref(database, "charging_status");

    const onValueChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data: ChargingStatus = snapshot.val();
        console.log("Firebase charging_status data:", data);

        const now = Date.now();

        // Check endTime validity
        if (data.duration?.endTime && data.isChargingInitialized) {
          if (now >= data.duration.endTime) {
            resetChargingStatus(); // Reset if endTime is reached
            return;
          }
        } else if (data.isChargingInitialized) {
          // Calculate and store endTime if missing
          const calculatedEndTime =
            now +
            (data.duration.hours * 3600000 + data.duration.minutes * 60000);
          data.duration.endTime = calculatedEndTime;
          set(ref(database, "charging_status"), data);
        }

        // Handle safety conditions
        if (fodTriggered || misalignmentTriggered || emergencyStop) {
          // Disable charging if safety conditions are triggered
          setStatus((prev) => ({
            ...prev,
            isChargingInitialized: false,
          }));
        } else {
          console.log("corrected data ", data);
          setStatus(data); // Update the status when safety conditions are cleared
          if (data.isChargingInitialized) {
            lastValidChargingState.current = data;
          }
        }
      }
    };

    onValue(chargingRef, onValueChange);
    return () => off(chargingRef, "value", onValueChange);
  }, [fodTriggered, misalignmentTriggered, emergencyStop]);

  // Monitor FOD status
  useEffect(() => {
    const fodRef = ref(database, "Is_FOD_Present");
    const onFODChange = (snapshot: any) => {
      if (snapshot.exists()) {
        setFodTriggered(snapshot.val());
      }
    };

    onValue(fodRef, onFODChange);
    return () => off(fodRef, "value", onFODChange);
  }, []);

  // Monitor misalignment status
  useEffect(() => {
    const misalignmentRef = ref(database, "isMisaligned");
    const onMisalignmentChange = (snapshot: any) => {
      if (snapshot.exists()) {
        setMisalignmentTriggered(snapshot.val());
      }
    };

    onValue(misalignmentRef, onMisalignmentChange);
    return () => off(misalignmentRef, "value", onMisalignmentChange);
  }, []);

  // Monitor emergency stop status
  useEffect(() => {
    const emergencyStopRef = ref(database, "emergencyStop");
    const onEmergencyStopChange = (snapshot: any) => {
      if (snapshot.exists()) {
        setEmergencyStop(snapshot.val());
      }
    };

    onValue(emergencyStopRef, onEmergencyStopChange);
    return () => off(emergencyStopRef, "value", onEmergencyStopChange);
  }, []);

  const updateChargingStatus = async (
    isCharging: boolean,
    duration?: { hours: number; minutes: number; endTime?: number }
  ) => {
    try {
      console.log("aaa: ", isCharging, duration);
      console.log(
        "Values ---->",
        isCharging,
        duration?.hours,
        duration?.minutes
      );
      if (fodTriggered || misalignmentTriggered || emergencyStop) {
        console.warn("Safety conditions triggered, cannot update charging.");
        return false;
      }

      const now = Date.now();
      const updatedEndTime =
        duration?.endTime ||
        (isCharging
          ? now +
            (duration?.hours || 0) * 3600000 +
            (duration?.minutes || 0) * 60000
          : undefined);

      const updatedStatus: Partial<ChargingStatus> = {
        isChargingInitialized: isCharging,
      };

      // If duration exists, include it in the updatedStatus
      if (duration) {
        updatedStatus.duration = {
          hours: duration.hours || 0,
          minutes: duration.minutes || 0,
          endTime: updatedEndTime,
        };
      } else {
        // Reference to the database path
        const statusRef = ref(database, "charging_status");

        // Fetch the current status
        const snapshot = await get(statusRef);
        const currentStatus: ChargingStatus = snapshot.exists()
          ? snapshot.val()
          : {
              isChargingInitialized: false,
              duration: { hours: 0, minutes: 0 },
            };
        updatedStatus.duration = currentStatus.duration;
        if (!updatedStatus.duration) {
          updatedStatus.duration = {
            hours: 0,
            minutes: 0,
          };
        }
      }

      // Log the updated status for debugging
      console.log({ updatedStatus });

      await set(ref(database, "charging_status"), {
        ...updatedStatus,
      });
      setStatus(updatedStatus as ChargingStatus);

      console.log("change or updated status", updatedStatus);
      return true;
    } catch (error) {
      console.error("Error updating charging status:", error);
      return false;
    }
  };

  const resetChargingStatus = async () => {
    try {
      lastValidChargingState.current = null;
      await set(ref(database, "charging_status"), {
        isChargingInitialized: false,
        duration: { hours: 0, minutes: 0, endTime: null },
      });
    } catch (error) {
      console.error("Error resetting charging status:", error);
    }
  };

  return {
    status,
    fodTriggered,
    misalignmentTriggered,
    emergencyStop,
    updateChargingStatus,
    resetChargingStatus,
  };
};
