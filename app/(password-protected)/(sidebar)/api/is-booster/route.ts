import { createAdminClient } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

const GUILD_ID = "1337108365591187640";
const ROLE_IDS = {
  booster: "1341154772006211666",
  mod: "1409270467226894387",
  developer: "1406629094623412244",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body.user_id;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid user_id" },
        { status: 400 }
      );
    }

    const { data, error } = await createAdminClient()
      .from("profiles_private")
      .select("discord_id")
      .eq("id", userId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const memberRes = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${data.discord_id}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );
    const dcData = await memberRes.json();

    const userRoles: string[] = dcData.roles ?? [];

    const isBooster = userRoles.includes(ROLE_IDS.booster);
    const isMod = userRoles.includes(ROLE_IDS.mod);
    const isDeveloper = userRoles.includes(ROLE_IDS.developer);
    const elevated = isBooster || isMod || isDeveloper;

    const rolesRes = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/roles`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );
    const allRoles = await rolesRes.json();

    const colors: Record<string, string | null> = {};
    for (const [key, id] of Object.entries(ROLE_IDS)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const role = allRoles.find((r: any) => r.id === id);
      colors[key] = role ? (role.colors) : null;
    }

    return NextResponse.json({
      isBooster,
      isMod,
      isDeveloper,
      elevated,
      colors,
    });
  } catch (error) {
    console.error("Error in /api/is-booster:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
