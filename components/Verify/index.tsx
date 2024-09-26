"use client";
import {
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  MiniAppVerifyActionPayload,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "app_staging_5a45208647efcc469f25d8f6c8a94b70", // This is your action ID from the Developer Portal
  signal: "mini-apptest-salpicon-jackpot",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

const triggerVerify = async () => {
  
  const payload = MiniKit.commands.verify(verifyPayload);
  console.log(payload, MiniKit.isInstalled());
  try {
    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      async (response: MiniAppVerifyActionPayload) => {
        console.log(response);
        if (response.status === "error") {
          return console.log("Error payload", response);
        }

        // Verify the proof in the backend
        const verifyResponse = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: response, // Parses only the fields we need to verify
            action: verifyPayload.action,
            signal: verifyPayload.signal, // Optional
          }),
        });

        // TODO: Handle Success!
        const verifyResponseJson = await verifyResponse.json();
        if (verifyResponseJson.status === 200) {
          console.log("Verification success!");
        } 
      }
    );

  } catch (error) {
    console.log(error);
  }
};

export const VerifyBlock = () => {
  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      async (response: MiniAppVerifyActionPayload) => {
        if (response.status === "error") {
          return console.log("Error payload", response);
        }

        // Verify the proof in the backend
        const verifyResponse = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: response, // Parses only the fields we need to verify
            action: verifyPayload.action,
            signal: verifyPayload.signal, // Optional
          }),
        });

        // TODO: Handle Success!
        const verifyResponseJson = await verifyResponse.json();
        if (verifyResponseJson.status === 200) {
          console.log("Verification success!");
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, []);

  return (
    <div>
      <h1>Verify Block</h1>
      <button className="bg-green-500 p-4" onClick={triggerVerify}>
        Test Verify
      </button>
    </div>
  );
};
