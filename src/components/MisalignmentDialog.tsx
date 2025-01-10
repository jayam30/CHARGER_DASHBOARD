// "use client";

// import React from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";


interface MisalignmentDialogProps {
  isMisaligned: boolean;
}

const MisalignmentDialog: React.FC<MisalignmentDialogProps> = ({ isMisaligned }) => {
  // return (
  //   <Dialog open={isMisaligned}>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Misalignment Detected</DialogTitle>
  //       </DialogHeader>
  //       <div className="text-center flex flex-col items-center text-red-500">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-8 w-8 mb-2 text-red-500"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //           />
  //         </svg>
  //         The charging pad is misaligned. Please adjust it to continue charging.
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // );


  return (
      <Dialog open={isMisaligned}>
        {/* <DialogContent className="max-w-[400px] bg-[#D9D9D9]/20 backdrop-blur-sm border-none">
          <div className="flex flex-col items-center gap-4 py-6">
            <DialogHeader className="text-center space-y-4">
              <DialogTitle className="text-2xl font-bold text-white text-center">
              Misalignment Detected
              </DialogTitle>
              <div className="bg-white rounded-full  p-8">
                <Image
                  src="/miss.png"
                  alt="Misalignment Detected"
                  width={500}
                  height={500}
                />
              </div>
              <Image
                src="/fo.png"
                alt="Misalignment Detected"
                width={50}
                height={50}
                className="animate-pulse absolute top-48 left-36"
              />
            </DialogHeader>
  
            <div className="flex flex-col items-center gap-2 text-center">
              <DialogDescription className="text-xl font-semibold text-white">
              Misalignment DETECTED
              </DialogDescription>
              <DialogDescription className="text-lg text-white/90">
              The charging pad is misaligned.
                <br />
                Please adjust it to continue charging
              </DialogDescription>
            </div>
          </div>
        </DialogContent> */}
      
      <DialogContent className="max-w-[400px] bg-neutral-800 backdrop-blur-sm border-none">
  <div className="flex flex-col items-center gap-4 py-6">
    <DialogHeader className="text-center space-y-4">
      <DialogTitle className="text-2xl font-bold text-white text-center">
        Misalignment Detected
      </DialogTitle>
      <div className="relative flex justify-center">
        <Image
          src="/miss.png"
          alt="Misalignment Detected"
          width={200}
          height={200}
          className="object-contain"
        />
      
      </div>
    </DialogHeader>

    <div className="flex flex-col items-center gap-2 text-center">
      <DialogDescription className="text-xl font-semibold text-white">
        Misalignment DETECTED
      </DialogDescription>
      <DialogDescription className="text-lg text-white/90">
        The charging pad is misaligned.
        <br />
        Please adjust it to continue charging
      </DialogDescription>
    </div>
  </div>
</DialogContent>














      </Dialog>
    );
};

export default MisalignmentDialog;

