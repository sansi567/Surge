const addr =
  "https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master/bogus-nxdomain.china.conf";

export default async function build() {
  const data = await parse();
  const list = data.map((v) => {
    return `IP-CIDR,${v}/32,no-resolve\n`;
  });

  const file = await Deno.open(`${Deno.cwd()}/Ruleset/Block/Bogus.list`, {
    write: true,
    truncate: true,
  });

  await file.write(
    new TextEncoder().encode(
      `# Bogus, https://github.com/felixonmars/dnsmasq-china-list\n# Update: ${
        new Date().toString()
      }\n${list.join("")}`,
    ),
  );

  file.close();
}

export async function parse() {
  const resp = await fetch(addr);
  const body = await resp.text();
  return body.split("\n").map((v) => {
    if (!v.startsWith("bogus-nxdomain=")) return "";
    return v.replace("bogus-nxdomain=", "");
  }).filter((v) => v !== "");
}
