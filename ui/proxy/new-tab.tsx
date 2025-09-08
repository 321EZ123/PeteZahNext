import { IoSearch } from "react-icons/io5";
import MarqueeBg from "../backgrounds/marquee-bg";
import Card from "../global/card";
import { TextInputChildren } from "../global/input";
import { Dispatch, SetStateAction } from "react";
import { Tab } from "@/lib/types";

export default function NewTab({
  tabs,
  setTabs,
  setCurrentIndex,
  className,
}: {
  tabs: Tab[];
  setTabs: Dispatch<SetStateAction<Tab[]>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  className?: string;
}) {
  return (
    <>
      <div className={`flex items-center justify-center w-full h-full overflow-hidden ${className}`}>
        <MarqueeBg />
        <Card className="flex flex-col gap-4 p-[30]! max-w-[80%]">
          <h1 className="w-full text-6xl text-center">PeteZah-Next</h1>
          <h3 className="text-xl text-center text-wrap">
            Warning: This isn&apos;t a proxy... yet. Some websites may not work
            right now because they don&apos;t allow iframe embedding.
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const form = e.currentTarget;

              const formData = new FormData(form);
              const query = (formData.get("search") as string)?.trim();
              if (!query) return;

              let url: string;
              try {
                url = new URL(query).toString();
              } catch {
                url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
              }

              let title = "No title";
              try {
                const res = await fetch(url);
                const html = await res.text();
                title = html.match(/<title>(.*?)<\/title>/i)?.[1] ?? title;
              } catch (err) {
                if (typeof window !== "undefined") {
                  console.warn("Fetch failed (handled):", err);
                }
              }
              const newTab: Tab = { title, url };
              setTabs((prev) => [...prev, newTab]);
              setCurrentIndex(tabs.length);

              form.reset();
            }}
          >
            <TextInputChildren name="search">
              <div className="flex items-center">
                <IoSearch />
              </div>
            </TextInputChildren>
          </form>
        </Card>
      </div>
    </>
  );
}
