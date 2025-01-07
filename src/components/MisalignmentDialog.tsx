"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MisalignmentDialog = ({ isMisaligned }: { isMisaligned: boolean }) => {
  return (
    <Dialog open={isMisaligned}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Misalignment Detected</DialogTitle>
        </DialogHeader>
        <div className="text-center text-red-500">
          The charging pad is misaligned. Please adjust it to continue charging.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MisalignmentDialog;
