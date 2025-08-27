"use client";

import { WipWarning } from "@/ui/wip/wip-page";
import CenteredDivPage from "@/ui/global/centered-div-page";
import { PrimaryButtonChildren } from "@/ui/global/buttons";
import Card from "@/ui/global/card";
import { Checkbox } from "@/ui/global/input";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { setLocalStorage } from "@/ui/settings-manager";
import TabConfigSettingsCard from "@/ui/settings/tab-config";

export default function Page() {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function AntiCloseCheckbox() {
    const [antiClose, setAntiClose] = useState(false);
    const isMounted = useRef(true);

    async function updateAntiClose(newVal: boolean) {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      await supabase
        .from("profiles_private")
        .update({ anti_close_enabled: newVal })
        .eq("id", user.id);
    }

    useEffect(() => {
      isMounted.current = true;
      const stored = localStorage.getItem("antiClose");
      if (stored !== null) setAntiClose(stored === "true");

      supabase.auth.getUser().then(async ({ data: { user } }) => {
        if (!user) return;
        const { data } = await supabase
          .from("profiles_private")
          .select("anti_close_enabled")
          .eq("id", user.id)
          .single();
        if (!isMounted.current) return;
        if (data?.anti_close_enabled !== undefined) {
          setAntiClose(data.anti_close_enabled);
          setLocalStorage("antiClose", String(data.anti_close_enabled));
        }
      });

      return () => {
        isMounted.current = false;
      };
    }, []);

    const handleChange = async () => {
      const newVal = !antiClose;
      setAntiClose(newVal);
      setLocalStorage("antiClose", String(newVal));
      await updateAntiClose(newVal);
    };

    return (
      <Checkbox
        checked={antiClose}
        onChange={handleChange}
        label="Anti-Close"
        className="mt-2!"
      />
    );
  }

  function AutoAboutBlankCheckbox() {
    const [autoAboutBlank, setAutoAboutBlank] = useState(false);
    const isMounted = useRef(true);

    async function updateAutoAboutBlank(newVal: boolean) {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      await supabase
        .from("profiles_private")
        .update({ auto_about_blank: newVal })
        .eq("id", user.id);
    }

    useEffect(() => {
      isMounted.current = true;
      const stored = localStorage.getItem("autoAboutBlank");
      if (stored !== null) setAutoAboutBlank(stored === "true");

      supabase.auth.getUser().then(async ({ data: { user } }) => {
        if (!user) return;
        const { data } = await supabase
          .from("profiles_private")
          .select("auto_about_blank")
          .eq("id", user.id)
          .single();
        if (!isMounted.current) return;
        if (data?.auto_about_blank !== undefined) {
          setAutoAboutBlank(data.auto_about_blank);
          setLocalStorage("autoAboutBlank", String(data.auto_about_blank));
        }
      });

      return () => {
        isMounted.current = false;
      };
    }, []);

    const handleChange = async () => {
      const newVal = !autoAboutBlank;
      setAutoAboutBlank(newVal);
      setLocalStorage("autoAboutBlank", String(newVal));
      await updateAutoAboutBlank(newVal);
    };

    return (
      <Checkbox
        checked={autoAboutBlank}
        onChange={handleChange}
        label="Auto about:blank"
        className="mt-2!"
      />
    );
  }

  function DisableRightClickCheckbox() {
    const [disableRightClick, setDisableRightClick] = useState(false);
    const isMounted = useRef(true);

    async function updateDisableRightClick(newVal: boolean) {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      await supabase
        .from("profiles_private")
        .update({ disable_right_click: newVal })
        .eq("id", user.id);
    }

    useEffect(() => {
      isMounted.current = true;
      const stored = localStorage.getItem("disableRightClick");
      if (stored !== null) setDisableRightClick(stored === "true");

      supabase.auth.getUser().then(async ({ data: { user } }) => {
        if (!user) return;
        const { data } = await supabase
          .from("profiles_private")
          .select("disable_right_click")
          .eq("id", user.id)
          .single();
        if (!isMounted.current) return;
        if (data?.disable_right_click !== undefined) {
          setDisableRightClick(data.disable_right_click);
          setLocalStorage(
            "disableRightClick",
            String(data.disable_right_click)
          );
        }
      });

      return () => {
        isMounted.current = false;
      };
    }, []);

    const handleChange = async () => {
      const newVal = !disableRightClick;
      setDisableRightClick(newVal);
      setLocalStorage("disableRightClick", String(newVal));
      await updateDisableRightClick(newVal);
    };

    return (
      <Checkbox
        checked={disableRightClick}
        onChange={handleChange}
        label="Disable Right-Click"
        className="mt-2!"
      />
    );
  }

  function openAboutBlank() {
    if (typeof window === "undefined") return;

    const popup = window.open("about:blank", "_blank");
    if (!popup || popup.closed)
      return alert("Please allow popups for this feature to work.");

    popup.document.title = localStorage.getItem("siteTitle") || "Home";
    const favicon = popup.document.createElement("link");
    favicon.rel = "icon";
    favicon.href = localStorage.getItem("siteLogo") || "/favicon.ico";
    popup.document.head.appendChild(favicon);

    popup.document.body.style.margin = "0";
    popup.document.body.style.display = "flex";
    popup.document.body.style.justifyContent = "center";
    popup.document.body.style.alignItems = "center";
    popup.document.body.style.height = "100vh";
    popup.document.body.style.background = "#fff";
    popup.document.body.innerHTML = `<div id="loading" style="font-family: sans-serif; font-size: 1.2rem;">Loading...</div>`;

    const iframe = popup.document.createElement("iframe");
    iframe.src = "/home";
    iframe.style.cssText =
      "position:absolute;top:0;left:0;width:100vw;height:100vh;border:none;display:none;";
    popup.document.body.appendChild(iframe);
    iframe.onload = () => {
      const loading = popup.document.getElementById("loading");
      if (loading) loading.remove();
      iframe.style.display = "block";
    };
  }

  return (
    <CenteredDivPage className="p-[50px]! max-h-[91%]! overflow-auto">
      <h1 className="text-3xl font-bold text-center sm:text-5xl md:text-6xl lg:text-7xl mb-4!">
        Settings
      </h1>
      <WipWarning overrideText="Warning: After navigating away from this page our site may freeze. Please reloud the page if any errors occur." />
      <Card className="mt-4! w-full">
        <h2 className="text-lg font-semibold sm:text-2xl md:text-3xl lg:text-4xl mb-2!">
          Cloaking
        </h2>
        <hr className="my-4!" />
        <p className="mb-2!">Control cloaking behavior to enhance privacy</p>
        <div className="w-full flex justify-center">
          <PrimaryButtonChildren onClick={openAboutBlank}>
            Open in about:blank
          </PrimaryButtonChildren>
        </div>
        <div className="flex gap-2 mt-2! justify-around items-center">
          <AntiCloseCheckbox />
          <AutoAboutBlankCheckbox />
          <DisableRightClickCheckbox />
        </div>
        <h2 className="text-lg font-semibold sm:text-2xl md:text-3xl lg:text-4xl mt-4!">
          Tab Configuration
        </h2>
        <hr className="my-4!" />
        <p className="mb-2!">Customize your site title and favicon</p>
        <div className="flex gap-2 mt-2! justify-around items-center">
          {mounted && <TabConfigSettingsCard />}
        </div>
      </Card>
    </CenteredDivPage>
  );
}
