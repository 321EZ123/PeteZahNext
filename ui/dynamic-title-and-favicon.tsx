"use client";
import { useEffect } from "react";

export default function DynamicTitleAndFavicon() {
  useEffect(() => {
    const interval = setInterval(() => {
      const siteTitle = localStorage.getItem("siteTitle") ?? "PeteZah-Next";
      console.log("siteTitle", siteTitle);
      const siteFavicon = localStorage.getItem("siteLogo") ?? "/favicon.ico";

      if (siteTitle) document.title = siteTitle;

      if (siteFavicon && siteFavicon !== "" && siteFavicon !== "undefined") {
        document
          .querySelectorAll<HTMLLinkElement>(
            'link[rel="icon"], link[rel="shortcut icon"]'
          )
          .forEach((el) => el.remove());

        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.type = "image/x-icon";
        favicon.href = siteFavicon;
        document.head.appendChild(favicon);

        const shortcutIcon = document.createElement("link");
        shortcutIcon.rel = "shortcut icon";
        shortcutIcon.type = "image/x-icon";
        shortcutIcon.href = siteFavicon;
        document.head.appendChild(shortcutIcon);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}
