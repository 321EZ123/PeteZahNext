import { useEffect, useState, useCallback, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import Card from "../global/card";
import { TextInput } from "@/ui/global/input";

type TabConfig = {
  siteTitle: string;
  siteLogo: string;
};

const presets: Record<string, TabConfig> = {
  "google-classroom": {
    siteTitle: "Google Classroom",
    siteLogo: "https://ssl.gstatic.com/classroom/favicon.ico",
  },
  schoology: {
    siteTitle: "Schoology",
    siteLogo:
      "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico",
  },
  google: {
    siteTitle: "Google",
    siteLogo: "https://www.google.com/favicon.ico",
  },
  pzn: {
    siteTitle: "PeteZah-Next",
    siteLogo: "/storage/images/logo-png-removebg-preview.png",
  },
};

export default function TabConfigSettingsCard() {
  const supabase = useMemo(() => createClient(), []); // ✅ stable ref

  const [tabConfig, setTabConfig] = useState<TabConfig>({
    siteTitle: localStorage.getItem("siteTitle") ?? "PeteZah-Next",
    siteLogo: localStorage.getItem("siteLogo") ?? "",
  });

  
  const saveConfig = useCallback(
    async (newConfig: TabConfig) => {
      localStorage.setItem("siteTitle", newConfig.siteTitle);
      localStorage.setItem("siteLogo", newConfig.siteLogo);

      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      await supabase
        .from("profiles_private")
        .update({ tab_config: newConfig })
        .eq("id", data.user.id);
    },
    [supabase]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      const { data: profile } = await supabase
        .from("profiles_private")
        .select("tab_config")
        .eq("id", data.user.id)
        .single();

      if (!cancelled && profile?.tab_config) {
        const cfg: TabConfig = {
          siteTitle: profile.tab_config.siteTitle ?? "PeteZah-Next",
          siteLogo: profile.tab_config.siteLogo ?? "",
        };
        setTabConfig(cfg);
        localStorage.setItem("siteTitle", cfg.siteTitle);
        localStorage.setItem("siteLogo", cfg.siteLogo);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  useEffect(() => {
    const t = setTimeout(() => saveConfig(tabConfig), 500);
    return () => clearTimeout(t);
  }, [tabConfig, saveConfig]);

  return (
    <Card className="flex flex-col gap-2! p-4!">
      <div className="flex items-center">
        <p>Preset:</p>
        <select
          onChange={(e) => {
            const key = e.target.value;
            if (key !== "custom" && presets[key]) {
              setTabConfig(presets[key]);
            }
          }}
          className="px-2! py-1! ml-2! bg-black border-2 border-white rounded-2xl hover:bg-gray-800 transition-colors duration-500"
        >
          <option className="bg-black" value="custom">
            Custom
          </option>
          <option className="bg-black" value="pzn">
            PeteZah-Next
          </option>
          <option className="bg-black" value="google-classroom">
            Google Classroom
          </option>
          <option className="bg-black" value="google">
            Google
          </option>
          <option className="bg-black" value="schoology">
            Schoology
          </option>
        </select>
      </div>

      <div className="flex items-center">
        <p>Site title:</p>
        <TextInput
          placeholder="PeteZah-Next"
          value={tabConfig.siteTitle}
          onChange={(content) =>
            setTabConfig((prev) => ({ ...prev, siteTitle: content }))
          }
        />
      </div>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
              const base64 = ev.target?.result as string;
              setTabConfig((prev) => ({ ...prev, siteLogo: base64 }));
            };
            reader.readAsDataURL(file);
          }}
          className="file:bg-black file:rounded-2xl file:px-2! file:py-1! file:border-2 file:border-white file:mr-2!"
        />
      </div>
    </Card>
  );
}
