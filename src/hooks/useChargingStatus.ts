
import { useState, useEffect } from "react";
import { ref, set, onValue, off } from "firebase/database";
import { database } from "@/config/firebase";

interface ChargingStatus {
  isChargingInitialized: boolean;
  duration: {
    hours: number;
    minutes: number;
    endTime?: number | null;
  };
}

export const useChargingStatus = () => {
  const [fodTriggered, setFodTriggered] = useState(false);
  const [misalignmentTriggered, setMisalignmentTriggered] = useState(false);
  const [status, setStatus] = useState<ChargingStatus>({
    isChargingInitialized: false,
    duration: {
      hours: 0,
      minutes: 0,
      endTime: null,
    },
  });

 

  useEffect(() => {
    const chargingRef = ref(database, "charging_status");

    // Listener callback
    const onValueChange = (snapshot: any) => {
      if (snapshot.exists()) {
        const data: ChargingStatus = snapshot.val();
        setStatus(data);

        // Check if charging should be stopped
        if (data.duration?.endTime && data.isChargingInitialized) {
          const now = Date.now();
          if (now >= data.duration.endTime) {
            resetChargingStatus();
          }
        }
      }
    };
    

    // Attach listener
    onValue(chargingRef, onValueChange);

    // Cleanup listener
    return () => {
      off(chargingRef, "value", onValueChange);
    };
  }, []);


  const updateChargingStatus = async (
    isCharging: boolean,
    duration?: { hours: number; minutes: number; endTime?: number | null }
  ) => {
    try {
      const chargingRef = ref(database, "charging_status");

      const updatedStatus: ChargingStatus = {
        isChargingInitialized: isCharging,
        duration: duration
          ? {
              hours: duration.hours || 0,
              minutes: duration.minutes || 0,
              endTime: duration.endTime || null,
            }
          : status.duration, // Preserve existing duration if none provided
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
    resetChargingStatus,
  };
};
// import { useState, useEffect } from "react";
// import { ref, set, onValue, off } from "firebase/database";
// import { database } from "@/config/firebase";

// interface ChargingStatus {
//   isChargingInitialized: boolean;
//   duration: {
//     hours: number;
//     minutes: number;
//     endTime?: number | null;
//   };
//   error?: string | null; // Added to handle FOD or misalignment errors
// }

// export const useChargingStatus = () => {
//   const [fodTriggered, setFodTriggered] = useState(false);
//   const [misalignmentTriggered, setMisalignmentTriggered] = useState(false);
//   const [status, setStatus] = useState<ChargingStatus>({
//     isChargingInitialized: false,
//     duration: {
//       hours: 0,
//       minutes: 0,
//       endTime: null,
//     },
//     error: null, // Default error state
//   });

//   useEffect(() => {
//     const chargingRef = ref(database, "charging_status");

//     // Listener callback
//     const onValueChange = (snapshot: any) => {
//       if (snapshot.exists()) {
//         const data: ChargingStatus = snapshot.val();
//         setStatus(data);

//         // Check if charging should be stopped
//         if (data.duration?.endTime && data.isChargingInitialized) {
//           const now = Date.now();
//           if (now >= data.duration.endTime) {
//             resetChargingStatus();
//           }
//         }
//       }
//     };

//     // Attach listener
//     onValue(chargingRef, onValueChange);

//     // Cleanup listener
//     return () => {
//       off(chargingRef, "value", onValueChange);
//     };
//   }, []);

//   useEffect(() => {
//     // Handle FOD or misalignment triggers
//     if (fodTriggered) {
//       updateChargingStatus(false, undefined, "FOD Detected");
//     } else if (misalignmentTriggered) {
//       updateChargingStatus(false, undefined, "Misalignment Detected");
//     } else if (!status.isChargingInitialized) {
//       // Clear errors when no triggers are active and charging isn't initialized
//       updateChargingStatus(false, undefined, null);
//     }
//   }, [fodTriggered, misalignmentTriggered]);

//   const updateChargingStatus = async (
//     isCharging: boolean,
//     duration?: { hours: number; minutes: number; endTime?: number | null },
//     error?: string | null
//   ) => {
//     try {
//       const chargingRef = ref(database, "charging_status");

//       const updatedStatus: ChargingStatus = {
//         isChargingInitialized: isCharging,
//         duration: duration
//           ? {
//               hours: duration.hours || 0,
//               minutes: duration.minutes || 0,
//               endTime: duration.endTime || null,
//             }
//           : status.duration, // Preserve existing duration if none provided
//         error: error ?? null, // Update error state
//       };

//       await set(chargingRef, updatedStatus);
//       return true;
//     } catch (error) {
//       console.error("Error updating charging status:", error);
//       return false;
//     }
//   };

//   const resetChargingStatus = async () => {
//     try {
//       const chargingRef = ref(database, "charging_status");
//       await set(chargingRef, {
//         isChargingInitialized: false,
//         duration: {
//           hours: 0,
//           minutes: 0,
//           endTime: null,
//         },
//         error: null, // Clear any errors
//       });
//       setFodTriggered(false);
//       setMisalignmentTriggered(false);
//       return true;
//     } catch (error) {
//       console.error("Error resetting charging status:", error);
//       return false;
//     }
//   };

//   return {
//     status,
//     updateChargingStatus,
//     resetChargingStatus,
//     setFodTriggered,
//     setMisalignmentTriggered,
//   };
// };
