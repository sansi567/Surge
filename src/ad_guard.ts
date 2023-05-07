import writeFile from "./writefile.ts";
import adbParse from "./adblock.ts";

const meta = {
  title: "Base",
  source: "EasyList, AdGuard",
  content: "",
  path: "/Ruleset/Block/Base.set",
};

export default async function build() {
  const data = await parse();
  await writeFile({ ...meta, content: data.join("\n") });
}

export async function parse() {
  return await adbParse([
    "https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt",
    "https://easylist.to/easylist/easylist.txt",
    "https://easylist.to/easylist/easyprivacy.txt",
  ]);
}
