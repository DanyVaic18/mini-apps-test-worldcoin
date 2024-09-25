"use client";
import {
  IDKitWidget,
  ISuccessResult,
  useIDKit,
  VerificationLevel,
} from "@worldcoin/idkit";

import React from "react";

const VerifyTest = () => {
  const { open, setOpen } = useIDKit()

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    window.location.href = "/success";
};

  return (
    <IDKitWidget
      app_id="app_staging_5a45208647efcc469f25d8f6c8a94b70" // obtained from the Developer Portal
      action="mini-apptest-salpicon-jackpot" // this is your action id from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};

export default VerifyTest;
