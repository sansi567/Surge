const addr =
  "https://raw.githubusercontent.com/misakaio/chnroutes2/master/chnroutes.txt";

export default async function build() {
  const resp = await fetch(addr);
  const body = await resp.text();
  const data = body.split("\n").filter((v) => {
    if (!v) return false;
    return !v.startsWith("#");
  });

  const list = data.map((v) => {
    return `IP-CIDR,${v}`;
  });

  const file = await Deno.open(`${Deno.cwd()}/Ruleset/China/China.list`, {
    write: true,
    append: true,
  });

  await file.write(
    new TextEncoder().encode(
      `# Update: ${new Date().toString()}\n${list.join("\n")}`,
    ),
  );

  file.close();
}
