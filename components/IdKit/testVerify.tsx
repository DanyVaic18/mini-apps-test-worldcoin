import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import React, { useState } from "react";
import { Button } from "../ui/button";

const TestVerify = () => {
  const [isOpenIdKit, setOpenIdKit] = useState<boolean>(false);

  const onSuccess = (result: ISuccessResult) => {
    console.log(result);
    // This is where you should perform frontend actions once a user has been verified
    window.alert(
      `Successfully verified with World ID!
        Your nullifier hash is: ` + result.nullifier_hash
    );
  };

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
  return (
    <IDKitWidget
      app_id="app_staging_5a45208647efcc469f25d8f6c8a94b70" // obtained from the Developer Portal
      action="mini-apptest-salpicon-jackpot" // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Orb}
    >
      {({ open }) => (
        // This is the button that will open the IDKit modal
        <Button onClick={open}>Verify with World ID</Button>
      )}
    </IDKitWidget>
  );
};

export default TestVerify;
