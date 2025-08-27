import { Metadata } from "next";
import Particles from "@/ui/particles";
import Sidebar from "@/ui/sidebar";
import { Suspense } from "react";
import { SidebarProvider } from "@/context/sidebar-context";
import { Analytics } from "@vercel/analytics/next";
import AntiScreenshotOverlay from "@/ui/anti-screenshot-overlay";
import { Cloak } from "@/ui/cloak";
import "../globals.css";
import { geistMono } from "@/lib/fonts";
import { CookiesProvider } from "next-client-cookies/server";
import { SupabaseAuthListener } from "@/ui/client-providers";
import SettingsProvider from "@/ui/settings-manager";
import DynamicTitleAndFavicon from "@/ui/dynamic-title-and-favicon";

export const metadata: Metadata = {
  title: "PeteZah-Next",
  description: "The next generation of PeteZah, privacy tool",
  keywords: "...",
  icons: { icon: "/favicon.ico" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`text-[#ededed] min-h-screen bg-[#0a0a0a] ${geistMono.className}`}>
      <SupabaseAuthListener />
      <Cloak>
        <AntiScreenshotOverlay />
        <Particles />
        <DynamicTitleAndFavicon />
        <SettingsProvider>
          <Suspense>
            <CookiesProvider>
              <SidebarProvider>
                <Sidebar>{children}</Sidebar>
              </SidebarProvider>
            </CookiesProvider>
          </Suspense>
        </SettingsProvider>
        <Analytics />
      </Cloak>
    </div>
  );
}
