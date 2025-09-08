"use client";

import { IoClose } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { PrimaryButtonChildren } from "@/ui/global/buttons";
import clsx from "clsx";
import { Tab } from "@/lib/types";
import NewTab from "@/ui/proxy/new-tab";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function reorder<T>(list: T[], start: number, end: number): T[] {
  const result = [...list];
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
}

export default function Page() {
  const [tabs, setTabs] = useState<Tab[]>([
    { title: "New Tab", url: "pzn://new-tab" },
  ]);
  const [currentTabIndex, setCurrentIndex] = useState<number>(0);

  function TabComponent({ tab, index }: { tab: Tab; index: number }) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const cleanupDraggable = draggable({
        element: el,
        getInitialData: () => ({ index }),
      });

      const cleanupDropTarget = dropTargetForElements({
        element: el,
        getData: () => ({ index }),
        onDrop: ({ source, self }) => {
          const from = (source?.data as { index: number })?.index;
          const to = (self?.data as { index: number })?.index;
          if (from === undefined || to === undefined || from === to) return;
          setTabs((prev) => reorder(prev, from, to));
          setCurrentIndex(to);
        },
      });

      return () => {
        cleanupDraggable();
        cleanupDropTarget();
      };
    }, [index]);

    return (
      <button
        ref={ref}
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
              const newTabs = prevTabs.filter((_, i) => i !== index);
              setCurrentIndex((prevIndex) => {
                if (index < prevIndex) return prevIndex - 1;
                if (index === prevIndex) {
                  if (prevIndex >= newTabs.length) {
                    return Math.max(newTabs.length - 1, 0);
                  }
                  return prevIndex;
                }
                return prevIndex;
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
          <div className="flex items-center h-full">
            Open a tab to get started.
          </div>
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
        ) : (
          tabs.map((tab, index) =>
            tab.url == "pzn://new-tab" ? (
              <NewTab
                key={index}
                index={index}
                tabs={tabs}
                setTabs={setTabs}
                setCurrentIndex={setCurrentIndex}
                className={currentTabIndex === index ? "block" : "hidden"}
              />
            ) : (
              <iframe
                key={index}
                className={clsx(
                  "w-full h-full z-20",
                  !(currentTabIndex == index) && "w-0! h-0!"
                )}
                title={tab.url}
                src={tab.url}
              />
            )
          )
        )}
      </div>
    </div>
  );
}
