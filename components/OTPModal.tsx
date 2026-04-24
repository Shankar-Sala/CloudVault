"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OtpModal = ({ accountId, email }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const sessionId = await verifySecret({ accountId, password: otp });
      if (sessionId) router.push("/");
    } catch {
      console.log("OTP verification failed");
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="rounded-2xl p-6 text-center bg-white dark:bg-dark-200 border border-light-300/40 shadow-xl">

        {/* Header */}
        <div className="relative mb-4">
          <AlertDialogTitle className="text-xl font-semibold">
            Enter Your OTP
          </AlertDialogTitle>

          <Image
            src="/assets/icons/close-dark.svg"
            alt="close"
            width={18}
            height={18}
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-1 cursor-pointer opacity-70 hover:opacity-100"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-light-100">
          We've sent a code to{" "}
          <span className="text-[#56B8FF] font-medium">{email}</span>
        </p>

        {/* OTP */}
        <div className="mt-6 flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="flex gap-3">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-12 rounded-lg border border-light-300 shadow-sm text-lg focus:ring-2 focus:ring-[#56B8FF] focus:border-[#56B8FF]"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="otp-submit-btn mt-6 rounded-lg px-5 py-2 text-white font-medium transition-all shadow-md"
            style={{ backgroundColor: "#56B8FF" }}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </div>

        {/* Resend */}
        <p className="mt-4 text-sm text-light-100">
          Didn't get a code?{" "}
          <span
            className="text-[#56B8FF] cursor-pointer hover:underline font-medium"
            onClick={() => sendEmailOTP({ email })}
          >
            Click to resend
          </span>
        </p>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;