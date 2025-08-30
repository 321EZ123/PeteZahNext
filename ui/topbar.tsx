"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTopbar } from "@/context/topbar-content";
import Link from "next/link";

export default function Topbar() {
  const { topbarToggled, toggleTopbar, hydrated } = useTopbar();

  return (
    hydrated && (
      <aside
        className={clsx(
          "fixed top-0 left-0 z-10 w-full md:hidden overflow-hidden transition-all duration-300 h-[90px]",
          topbarToggled && "-top-[60px]!"
        )}
      >
        <div className="relative w-screen h-[60px] bg-[#0A1D37] border-b-2 border-white flex items-center border-x-2 rounded-br-2xl">
          <div className="flex gap-2 ml-2!">
            <Link href={"/home"} className="flex items-center">
              <Image
                src="/logo-png-removebg-preview.png"
                height={20}
                width={20}
                alt="PeteZah-Next"
                className="w-[20px] h-[20px]"
              />
              <p className="ml-2! text-white font-bold">PeteZah-Next</p>
            </Link>
            <p className="">- This topbar is a work in progress.</p>
          </div>

          <div
            onClick={toggleTopbar}
            className="absolute -bottom-[30px] -left-[2px] h-[30px] w-[20%] bg-[#0A1D37] border-b-2 border-x-2 border-white flex items-center justify-center rounded-b-2xl cursor-pointer"
          >
            <Image
              src="/logo-png-removebg-preview.png"
              height={20}
              width={20}
              alt="PeteZah"
            />
            <p className="ml-2! hidden sm:block text-white font-bold">
              {topbarToggled ? "Close" : "Menu"}
            </p>
          </div>
        </div>
      </aside>
    )
  );
}
