"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const form = useForm({
    resolver: zodResolver(authFormSchema(type)),
    defaultValues: { fullName: "", email: "" },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount(values)
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <h1 className="text-3xl font-semibold text-center text-dark-100 dark:text-white tracking-tight">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          {/* Full Name */}
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-light-100">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                     className="rounded-lg shadow-sm focus:ring-2 focus:ring-[#56B8FF] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="rounded-lg shadow-sm focus:ring-2 focus:ring-[#56B8FF] transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue text-white px-5 py-2 font-medium shadow-md hover:bg-blue/80 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading
                ? "Processing..."
                : type === "sign-in"
                  ? "Sign In"
                  : "Sign Up"}
            </Button>
          </div>

          {/* Error */}
          {errorMessage && (
            <p className="text-center text-sm text-error bg-red/5 py-2 px-3 rounded-lg">{errorMessage}</p>
          )}

          {/* Switch */}
          <div className="text-center text-sm">
            <span className="text-light-100 dark:text-light-200">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-2 font-semibold text-blue hover:text-blue/80 transition"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;