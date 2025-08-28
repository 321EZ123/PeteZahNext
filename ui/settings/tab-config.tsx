import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Card from "../global/card";
import { TextInput } from "@/ui/global/input";
import { setLocalStorage } from "@/ui/settings-manager";

interface tabConfig {
  siteTitle?: string;
  siteLogo?: string;
}

export function TabConfigSettingsCard() {
  const [tabConfig, setTabConfig] = useState<tabConfig>({});
  const supabase = createClient();

  async function updateTabConfig(newVal: tabConfig) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { error } = await supabase
      .from("profiles_private")
      .update({ tab_config: newVal })
      .eq("id", user.id);

    if (error) console.error(error);
  }

  useEffect(() => {
    const storedTitle = localStorage.getItem("siteTitle") || "PeteZah-Next";

    setTabConfig((prev) => ({
      ...prev,
      siteTitle: storedTitle,
    }));

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles_private")
        .select("tab_config")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data?.tab_config !== undefined) {
        setTabConfig(data.tab_config);
        setLocalStorage(
          "siteTitle",
          data.tab_config.siteTitle || "PeteZah-Next"
        );
        if (data.tab_config.siteLogo) {
          setLocalStorage("siteLogo", data.tab_config.siteLogo || "");
        }
      }
    });
  }, [supabase]);

  const handleTitleChange = async (config = tabConfig) => {
    setLocalStorage("siteTitle", String(config.siteTitle));
    await updateTabConfig(config);
  };

  const handleLogoChange = async (image: string) => {
    if (!image) return;
    setLocalStorage("siteLogo", String(image));
    await updateTabConfig({ ...tabConfig, siteLogo: image });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleTitleChange();
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabConfig]);

  return (
    <Card>
      <div className="flex items-center">
        <p>Site title:</p>
        <TextInput
          placeholder={tabConfig.siteTitle || "PeteZah-Next"}
          value={tabConfig.siteTitle ?? ""}
          onChange={(content) => {
            setTabConfig({ ...tabConfig, siteTitle: content });
            handleTitleChange();
          }}
        />
      </div>
      <div className="flex items-center mt-2!">
        <p>Site favicon:</p>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
              const base64 = ev.target?.result as string;
              console.log("Read file as base64:", base64);
              setTabConfig({ ...tabConfig, siteLogo: base64 });
              handleLogoChange(base64);
            };
            reader.readAsDataURL(file);
          }}
          type="file"
          name=""
          id=""
          accept="image/*"
          className="file:bg-black file:rounded-2xl file:px-2! file:py-1! file:border-2 file:border-white file:mx-2!"
        />
      </div>
    </Card>
  );
}
