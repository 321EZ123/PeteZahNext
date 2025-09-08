"use client";

import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PrimaryButtonChildren } from "@/ui/global/buttons";
import clsx from "clsx";
import { TextInputChildren } from "@/ui/global/input";
import MarqueeBg from "@/ui/backgrounds/marquee-bg";
import Card from "@/ui/global/card";

interface Tab {
  title: string;
  url: string;
}

export default function Page() {
  const [tabs, setTabs] = useState<Tab[]>([
    { title: "New Tab", url: "pzn://new-tab" },
  ]);
  const [currentTabIndex, setCurrentIndex] = useState<number>(0);

  function TabComponent({ tab, index }: { tab: Tab; index: number }) {
    return (
      <>
        <button
          type="button"
          title={tab.title}
          onClick={() => setCurrentIndex(index)}
          className={clsx(
            `hover:bg-[#35537e] transition-all duration-300 rounded-t-2xl px-2! py-1! min-w-30 max-w-70 overflow-ellipsis overflow-y-hidden h-10 flex items-center justify-between border-t-2 border-x-2 border-[#0096FF]`,
            index == currentTabIndex && "bg-[#35537e]!"
          )}
        >
          <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-50">
            {tab.title}
          </p>
          <div
            onClick={(e) => {
              e.stopPropagation();

              setTabs((prevTabs) => {
                if (!prevTabs) return [];

                const newTabs = prevTabs.filter((_, i) => i !== index);

                setCurrentIndex((prevIndex) => {
                  if (index < prevIndex) {
                    return prevIndex - 1;
                  } else if (index === prevIndex) {
                    if (prevIndex >= newTabs.length) {
                      return Math.max(newTabs.length - 1, 0);
                    } else {
                      return prevIndex;
                    }
                  } else {
                    return prevIndex;
                  }
                });

                return newTabs;
              });
            }}
            className="cursor-pointer hover:bg-[#7a92b3] transition-all duration-300 rounded-full"
            title="Close tab"
          >
            <IoClose />
          </div>
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-15 bg-[#1e324e] border-b-2 border-b-[#0096FF] flex gap-4 items-end px-4! overflow-x-auto z-10">
        {tabs && tabs.length > 0 ? (
          <>
            {tabs.map((tab, index) => (
              <TabComponent index={index} tab={tab} key={index}></TabComponent>
            ))}
            <button
              title="New tab"
              type="button"
              onClick={() => {
                const originalTabsLength = tabs.length;
                setTabs([...tabs, { title: "New Tab", url: "pzn://new-tab" }]);
                setCurrentIndex(originalTabsLength);
              }}
              className="flex items-center hover:bg-[#35537e] transition-all duration-300 justify-center w-9 h-9 m-1! rounded-full border-2 border-[#0096FF]"
            >
              <FaPlus />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center h-full">
              Open a tab to get started.
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-full h-full">
        {tabs.length == 0 ? (
          <PrimaryButtonChildren
            onClick={() =>
              setTabs([...tabs, { title: "New Tab", url: "pzn://new-tab" }])
            }
          >
            New Tab
          </PrimaryButtonChildren>
        ) : tabs[currentTabIndex].url == "pzn://new-tab" ? (
          <>
            <div className="flex items-center justify-center w-full h-full overflow-hidden">
              <MarqueeBg />
              <Card className="flex flex-col gap-4 p-[30]!">
                <h1 className="text-6xl">PeteZah-Next</h1>
                <h3 className="text-xl text-center">
                  Warning: This isn&apos;t a proxy... yet.
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const query = (formData.get("search") as string)?.trim();
                    if (!query) return;

                    let url: string;
                    try {
                      url = new URL(query).toString();
                    } catch {
                      url = `https://duckduckgo.com/?q=${encodeURIComponent(
                        query
                      )}`;
                    }

                    const newTab: Tab = { title: "Loading...", url };
                    setTabs((prev) => [...prev, newTab]);
                    setCurrentIndex(tabs.length);

                    e.currentTarget.reset();
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
        ) : (
          <iframe
            title={tabs[currentTabIndex].title}
            src={tabs[currentTabIndex].url}
          />
        )}
      </div>
    </div>
  );
}
