"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Card from "@/ui/global/card";
import React from "react";

type RoleColor = {
  primary_color: number;
  secondary_color: number;
  tertiary_color: number | null;
};

export default function BoosterData() {
  const [isBooster, setIsBooster] = useState<boolean | null>(null);
  const [boosterRoles, setBoosterRoles] = useState<
    { name: string; value: boolean }[]
  >([]);
  const [colors, setColors] = useState<{
    booster: RoleColor;
    mod: RoleColor;
    developer: RoleColor;
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user;
      if (!user) return;

      const res = await fetch(`/api/is-booster?user_id=${user.id}`, {
        method: "POST",
        body: JSON.stringify({ user_id: user.id }),
      });

      const json = await res.json();

      setBoosterRoles([
        { name: "Booster", value: json.isBooster },
        { name: "Mod", value: json.isMod },
        { name: "Developer", value: json.isDeveloper },
      ]);

      if (res.ok) {
        setIsBooster(json.elevated);
        setColors(json.colors);
      }
    });
  }, [supabase.auth]);

  function RoleName({ name, colors }: { name: string; colors: RoleColor }) {
    const { primary_color, secondary_color } = colors;
    const primary = `#${primary_color.toString(16).padStart(6, "0")}`;
    const secondary = `#${secondary_color.toString(16).padStart(6, "0")}`;

    return (
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${primary}, ${secondary})`,
        }}
      >
        {name}
      </span>
    );
  }

  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <h1 className="mb-4! text-2xl font-bold">Booster Data</h1>
      {isBooster !== null ? (
        <>
          <p>
            {isBooster ? (
              "You are a booster/mod/dev! We have tons of perks coming your way."
            ) : (
              <span>
                You are not a booster. Boost our Discord server at{" "}
                <a
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://discord.gg/GqshrYNn62"
                >
                  https://discord.gg/GqshrYNn62
                </a>
                .
              </span>
            )}
          </p>

          <p>
            Special roles:{" "}
            {colors &&
              boosterRoles
                .filter((role) => role.value)
                .map((role, i, arr) => {
                  const colorKey = role.name.toLowerCase() as
                    | "booster"
                    | "mod"
                    | "developer";

                  return (
                    <React.Fragment key={i}>
                      <RoleName name={role.name} colors={colors[colorKey]} />
                      {i !== arr.length - 1 && ", "}
                    </React.Fragment>
                  );
                })}
          </p>
        </>
      ) : (
        <p className="text-lg">No booster data available at the moment.</p>
      )}
    </Card>
  );
}
