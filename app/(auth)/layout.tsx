"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen font-poppins">

      {/* LEFT */}
      <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-blue via-indigo-500 to-pink p-10 lg:flex xl:w-2/5">

        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink/30 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex max-w-[430px] flex-col space-y-10"
        >
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
          />

          <div className="space-y-3 text-white">
            <h1 className="text-3xl font-bold leading-tight">
              Your files, organized beautifully
            </h1>
            <p className="text-lg opacity-90">
              Store, manage and access your data anytime with speed and security.
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="flex justify-center"
          >
            {/* <Image
              src="/assets/images/file2.png"
              alt="Files"
              width={300}
              height={300}
              className="drop-shadow-2xl"
            /> */}
          </motion.div>
        </motion.div>
      </section>

      {/* RIGHT */}
      <section className="flex flex-1 flex-col items-center justify-center bg-light-300 p-4 sm:p-6">

        <div className="mb-8 lg:hidden">
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={200}
            height={80}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-drop-1 backdrop-blur-lg"
        >
          {children}
        </motion.div>

        <p className="mt-6 text-sm text-light-200">
          © 2026 CloudVault. All rights reserved.
        </p>
      </section>
    </div>
  );
};

export default Layout;