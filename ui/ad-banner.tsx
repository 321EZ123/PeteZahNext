"use client";

import clsx from "clsx";
import Script from "next/script";
import { useEffect } from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AdBanner() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const atOptions = {
      key: "63a9cb25e974a9b6f959b15af26b5eee",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/63a9cb25e974a9b6f959b15af26b5eee/invoke.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-63a9cb25e974a9b6f959b15af26b5eee"></div>;
}

export function PageAdBanner() {
  const [toggled, setToggled] = useState(true);
  return (
    <>
      <Script
        async={true}
        data-cfasync="false"
        src="//pl27611320.revenuecpmgate.com/3438d5cb0f1e239f554fefbd6dfef939/invoke.js"
      ></Script>
      <div className={clsx("absolute bottom-0 z-10 flex justify-center w-full transition-all duration-300 scale-50 text-white", toggled ? "opacity-100" : "opacity-0")}>
        <div className="relative max-w-1/2">
          <div
            className="bg-black w-full rounded-2xl p-4!"
            id="container-3438d5cb0f1e239f554fefbd6dfef939"
          ></div>
          <button type="button" title="Close ads" onClick={() => setToggled(false)} className="absolute flex items-center justify-center bg-black border-2 border-white rounded-full w-15 h-15 -top-8 -right-8">
            <IoClose size={40} />
          </button>
        </div>
      </div>
    </>
  );
}
