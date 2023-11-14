import { serve } from "https://deno.land/std@0.186.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.186.0/http/file_server.ts";

await serve((req) => {
  const pathname = new URL(req.url).pathname;
  if (pathname.startsWith("/Modules") || pathname.startsWith("/Ruleset") || pathname.startsWith("/Script")) {
    return serveDir(req);
  }

  return new Response(`${new Date().toString()}`);
});
