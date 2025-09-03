"use client";

import CenteredDivPage from "../global/centered-div-page";
import { PrimaryButton } from "@/ui/global/buttons";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function WipPage({
  estCompletionDate,
}: {
  estCompletionDate?: string;
}) {
  const router = useRouter();

  function returnHome() {
    router.push("/");
  }

  return (
    <>
      <CenteredDivPage className="p-[50px]!">
        <div className="flex items-center justify-center gap-4!">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            This page is a work in progress.
          </h1>
        </div>
        <br />
        <ol className="text-lg text-center sm:text-left">
          <li className="mb-2">
            Check back here later.
            {estCompletionDate && (
              <> We hope to complete this feature {estCompletionDate}.</>
            )}
          </li>
        </ol>
        <br />
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <PrimaryButton
            Icon={HomeIcon}
            text={"Return Home"}
            onClick={returnHome}
          />
        </div>
      </CenteredDivPage>
    </>
  );
}

export function WipPageData({
  estCompletionDate,
}: {
  estCompletionDate?: string;
}) {
  const router = useRouter();

  function returnHome() {
    router.push("/");
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4!">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          This page is a work in progress.
        </h1>
      </div>
      <br />
      <ol className="text-lg text-center sm:text-left">
        <li className="mb-2">
          Check back here later.
          {estCompletionDate && (
            <> We hope to complete this feature {estCompletionDate}.</>
          )}
        </li>
      </ol>
      <br />
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <PrimaryButton
          Icon={HomeIcon}
          text={"Return Home"}
          onClick={returnHome}
        />
      </div>
    </>
  );
}

export function WipWarning({
  estCompletionDate,
  overrideText,
}: {
  estCompletionDate?: string;
  overrideText?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-4! text-red-500 font-semibold">
        <h1 className="text-xl text-center">
          {overrideText ?? (
            <>
              This page is a work in progress.{" "}
              {estCompletionDate && (
                <> We hope to complete it {estCompletionDate}.</>
              )}
            </>
          )}
        </h1>
      </div>
    </>
  );
}
