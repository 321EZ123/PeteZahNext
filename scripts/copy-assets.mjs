import { cp, mkdir, rm } from "fs/promises";
import path from "path";

async function safeCopy(src, dest) {
  try {
    await rm(dest, { recursive: true, force: true });

    await mkdir(dest, { recursive: true });

    await cp(src, dest, { recursive: true });

    console.log(`✅ Copied from ${src} → ${dest}`);
  } catch (err) {
    console.error(`❌ Failed to copy ${src} → ${dest}`);
    console.error(err.message);
    process.exitCode = 1;
  }
}

async function main() {
  const epoxySrc = path.join("node_modules", "@mercuryworkshop", "epoxy-transport", "dist");
  const epoxyDest = path.join("public", "epoxy");

  const baremuxSrc = path.join("node_modules", "@mercuryworkshop", "bare-mux", "dist");
  const baremuxDest = path.join("public", "baremux");

  const scramjetSrc = path.join("node_modules", "@mercuryworkshop", "scramjet", "dist");
  const scramjetDest = path.join("public", "scram");

  await safeCopy(epoxySrc, epoxyDest);
  await safeCopy(baremuxSrc, baremuxDest);
  await safeCopy(scramjetSrc, scramjetDest);
}

main();
