import { serve } from "https://deno.land/std@0.186.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.186.0/http/file_server.ts";

await serve((req) => {
    const pathname = new URL(req.url).pathname;
    if (pathname.startsWith("/Modules")) {
        return serveDir(req, {
            fsRoot: "Modules",
        });
    }
    if (pathname.startsWith("/Ruleset")) {
        return serveDir(req, {
            fsRoot: "Ruleset",
        });
    }

    return new Response(`${new Date().toString()}`);
});
