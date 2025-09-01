/* eslint-disable @next/next/no-page-custom-font */
import { Metadata } from "next";
import Particles from "@/ui/particles";
import Sidebar from "@/ui/sidebar";
import { Suspense } from "react";
import { SidebarProvider } from "@/context/sidebar-context";
import { TopbarProvider } from "@/context/topbar-content";
import { Analytics } from "@vercel/analytics/next";
import AntiScreenshotOverlay from "@/ui/anti-screenshot-overlay";
import { Cloak } from "@/ui/cloak";
import "../globals.css";
import Head from "next/head";
import { geistMono } from "@/lib/fonts";
import { CookiesProvider } from "next-client-cookies/server";
import { SupabaseAuthListener } from "@/ui/client-providers";
import SettingsProvider from "@/ui/settings-manager";

export const metadata: Metadata = {
  description: "The next generation of PeteZah, privacy tool",
  keywords: `
    security, privacy, student privacy, digital safety,
    education, learning, teaching, curriculum, classroom technology, study tools, academic resources,
    school, public school, private school, K-12, primary school, secondary school, high school,
    higher education, university, college, degree, diploma, academic success,
    online learning, e-learning, distance education, remote learning, virtual classroom, digital learning, education software, learning platform,
    math, mathematics, algebra, geometry, calculus, science, physics, chemistry, biology, environmental science,
    english, literature, reading, writing, grammar, language arts,
    history, social studies, geography, civics, economics, philosophy, psychology, computer science, coding, programming, technology in education
  `,
  other: {
    "benrogo:index": "index",
    "benrogo:uvpath": "/static/uv/uv.config.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupabaseAuthListener />
      <Head>
        <title key="title">PeteZah-Next</title>
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`text-[#ededed] min-h-screen bg-[#0a0a0a] ${geistMono.className}`}
      >
        <Cloak>
          <AntiScreenshotOverlay />
          <Particles />
          <SettingsProvider>
            <TopbarProvider>
              <Suspense>
                <CookiesProvider>
                  <SidebarProvider>
                    <Sidebar>{children}</Sidebar>
                  </SidebarProvider>
                </CookiesProvider>
              </Suspense>
            </TopbarProvider>
          </SettingsProvider>
          <Analytics />
        </Cloak>
      </div>
    </>
  );
}
