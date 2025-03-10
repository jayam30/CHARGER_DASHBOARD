
//MISSALIGNMENT
// hooks/useBMSData.ts
import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/config/firebase";

interface BMSData {
  voltage: number;
  current: number;
  SOC: number;
  targetSOC?: number; 
  isFodThere?: boolean; 
  isMisaligned?: boolean; 
  isReceiverCoilDetected: boolean;
  loading: boolean;
  error: string | null;
}

export const useBMSData = () => {
  const [bmsData, setBMSData] = useState<BMSData>({
    voltage: 0,
    current: 0,
    SOC: 0,
    targetSOC: 0,
    isFodThere: false, 
    isMisaligned: false, // Initialize isMisaligned  
    isReceiverCoilDetected: true,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Changed reference path to read from root BMSData
    const bmsRef = ref(database, "BMSData");

    const unsubscribe = onValue(
      bmsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setBMSData({
            voltage: data.latest?.voltage ?? 0,
            current: data.latest?.current ?? 0,
            SOC: data.latest?.SOC ?? 0,
            targetSOC: data.latest?.targetSOC ?? 0,
            isFodThere: data.isFodThere ?? false, 
            isMisaligned: data.isMisaligned ?? false, // Update isMisaligned from Firebase 
            isReceiverCoilDetected: data.isReceiverCoilDetected ?? true,
            loading: false,
            error: null,
          });
        } else {
          setBMSData((prev) => ({
            ...prev,
            loading: false,
            error: "No data available",
          }));
        }
      },
      (error) => {
        setBMSData((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );

    // Cleanup subscription
    return () => {
      off(bmsRef);
    };
  }, []);

  return bmsData;
};
