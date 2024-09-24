"use client";
import { useEffect } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export const SignIn = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (session) {
    return (
      <>
        <p>
          Signed in as <b>{session?.user?.name?.slice(0, 10)}</b>
        </p>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out <FaArrowRightToBracket className="mx-2 mt-0.5" />{" "}
        </Button>
      </>
    );
  } else {
    return (
      <Button onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
};
