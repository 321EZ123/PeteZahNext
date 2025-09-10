"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const atOptions = {
      key: '63a9cb25e974a9b6f959b15af26b5eee',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    };

    const script = document.createElement('script');
    script.src = "https://www.highperformanceformat.com/63a9cb25e974a9b6f959b15af26b5eee/invoke.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-63a9cb25e974a9b6f959b15af26b5eee"></div>;
}
