"use client";

import Image from "next/image";
import clsx from "clsx";
import { useTopbar } from "@/context/topbar-content";
import Link from "next/link";
import MultiLink from "./global/multilink";

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
        <div className="relative w-screen h-[60px] bg-[#0A1D37] border-b-2 border-[#0096FF] flex items-center border-x-2 rounded-br-2xl overflow-y-visible">
          <div className="flex gap-2 ml-2! text-sm">
            <Link
              href={"/home"}
              className="flex items-center border-r-2 pr-2! border-white"
            >
              <p className="ml-2! text-white font-bold">PeteZah-Next</p>
            </Link>
            <MultiLink
              label="Entertainment"
              subLinks={[
                { label: "Games", href: "/g" },
                { label: "Apps", href: "/a" },
                { label: "Proxy", href: "/pr" },
              ]}
            />
            |
            <MultiLink label="User" subLinks={[
                { label: "Profile", href: "/p" },
                { label: "Settings", href: "/settings" },
                { label: "Access", href: "/access" },
            ]} />
            |
            <MultiLink label="Info" subLinks={[
                { label: "About", href: "/about" },
                { label: "Feedback", href: "/feedback" },
                { label: "Changelog", href: "/changelog" },
            ]} />
          </div>

          <div
            onClick={toggleTopbar}
            className="absolute -bottom-[30px] -left-[2px] h-[30px] w-[20%] bg-[#0A1D37] border-b-2 border-x-2 border-[#0096FF] flex items-center justify-center rounded-b-2xl cursor-pointer z-50"
          >
            <Image
              src="/logo-png-removebg-preview.png"
              height={20}
              width={20}
              alt="PeteZah"
              unoptimized={process.env.NODE_ENV === "development"}
            />
            <p className="ml-2! hidden sm:block text-white font-bold">
              {topbarToggled ? "Menu" : "Close"}
            </p>
          </div>
        </div>
      </aside>
    )
  );
}
