const addr =
  "https://raw.githubusercontent.com/misakaio/chnroutes2/master/chnroutes.txt";

export default async function build() {
  const data = await parse();
  const list = data.map((v) => {
    return `IP-CIDR,${v}\n`;
  });

  const file = await Deno.open(`${Deno.cwd()}/Ruleset/China/China.list`, {
    write: true,
    truncate: true,
  });

  await file.write(
    new TextEncoder().encode(
      `# China CIDR, https://misaka.io\n# Update: ${new Date().toString()}\n${
        list.join("")
      }`,
    ),
  );

  file.close();
}

export async function parse() {
  const resp = await fetch(addr);
  const body = await resp.text();
  return body.split("\n").filter((v) => {
    if (!v) return false;
    return !v.startsWith("#");
  });
}
