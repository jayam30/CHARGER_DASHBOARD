// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import MisalignmentDialog from "@/components/MisalignmentDialog";

// const MisalignmentDetection = () => {
//   const [isMisaligned, setIsMisaligned] = useState(false);
//   const [isScanning, setIsScanning] = useState(false);

//   useEffect(() => {
//     // Simulate misalignment detection
//     const detectMisalignment = () => {
//       setIsScanning(true);
//       setTimeout(() => {
//         setIsMisaligned(Math.random() > 0.5);
//         setIsScanning(false);
//       }, 3000);
//     };

//     detectMisalignment();
//   }, []);

//   return (
//     <div
//       className="w-[768px] h-[1024px] overflow-hidden bg-[#2A2D32] font-sans pt-7"
//       style={{
//         backgroundImage: "url(/main-bg.png)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Misalignment Dialog */}
//       <MisalignmentDialog isMisaligned={isMisaligned} />

//       {/* Header Section */}
//       <div className="flex justify-center items-center p-1 pt-20 w-full px-8">
//         <motion.div
//           className="text-left flex-col gap-2 mb-12 relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           <motion.div
//             className="text-gray-200 text-4xl font-medium tracking-wide relative group"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <span className="relative inline-block">Misalignment Detection</span>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Charging Pad */}
//       <div className="w-full flex justify-center items-center mb-8">
//         <div className="relative">
//           <Image
//             src="/charger-base.png"
//             alt="Charging pad"
//             width={300}
//             height={300}
//           />
//           {isScanning && (
//             <motion.div
//               className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-30"
//               animate={{
//                 scale: [1, 1.1, 1],
//                 opacity: [0.3, 0.1, 0.3],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           )}
//           {isMisaligned && (
//             <motion.div
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Image
//                 src="/misalignment-icon.png"
//                 alt="Misalignment"
//                 width={50}
//                 height={50}
//               />
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Status Display */}
//       <div className="w-full flex justify-center items-center">
//         <motion.div
//           className={`text-2xl font-bold ${
//             isScanning
//               ? "text-blue-400"
//               : isMisaligned
//               ? "text-red-500"
//               : "text-green-500"
//           }`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {isScanning
//             ? "Scanning for misalignment..."
//             : isMisaligned
//             ? "Misalignment detected!"
//             : "Charging pad aligned"}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default MisalignmentDetection;
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MisalignmentDialog from "@/components/MisalignmentDialog";

const MisalignmentDetection = () => {
  const [isMisaligned, setIsMisaligned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Simulate misalignment detection
    const detectMisalignment = () => {
      setIsScanning(true);
      setTimeout(() => {
        setIsMisaligned(Math.random() > 0.5);
        setIsScanning(false);
      }, 3000);
    };

    detectMisalignment();
  }, []);

  return (
    <div
      className="w-[768px] h-[1024px] overflow-hidden bg-[#2A2D32] font-sans pt-7"
      style={{
        backgroundImage: "url(/main-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MisalignmentDialog isMisaligned={isMisaligned} />

      <div className="flex justify-center items-center p-1 pt-20 w-full px-8">
        <motion.div
          className="text-left flex-col gap-2 mb-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-gray-200 text-4xl font-medium tracking-wide relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="relative inline-block">Misalignment Detection</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full flex justify-center items-center mb-8">
        <div className="relative">
          <Image
            src="/charger-base.png"
            alt="Charging pad"
            width={300}
            height={300}
          />
          {isScanning && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          {isMisaligned && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/misalignment-icon.png"
                alt="Misalignment"
                width={50}
                height={50}
              />
            </motion.div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <motion.div
          className={`text-2xl font-bold ${
            isScanning
              ? "text-blue-400"
              : isMisaligned
              ? "text-red-500"
              : "text-green-500"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isScanning
            ? "Scanning for misalignment..."
            : isMisaligned
            ? "Misalignment detected!"
            : "Charging pad aligned"}
        </motion.div>
      </div>
    </div>
  );
};

export default MisalignmentDetection;
