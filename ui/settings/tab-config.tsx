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
          setLocalStorage("siteLogo", data.tab_config.siteLogo || "");
        }
      });
    }, [supabase]);

    const handleChange = async (config = tabConfig) => {
      setLocalStorage("siteTitle", String(config.siteTitle));
      await updateTabConfig(config);
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        handleChange();
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
              console.log(content);
              setTabConfig({ ...tabConfig, siteTitle: content });
              handleChange();
            }}
          />
        </div>

        {/*<input type="file" name="" id="" />*/}
      </Card>
    );
  }