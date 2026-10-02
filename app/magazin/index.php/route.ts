import { handleWpRest, wpRestPreflight, wpRestResponse } from "@/lib/wp-rest-compat";

// WordPress-Schreibweise ohne schöne Permalinks: /magazin/index.php?rest_route=/wp/v2/posts
// Auch /magazin/?rest_route=/wp/v2/posts landet hier (Rewrite in next.config.ts); ohne rest_route geht es ins Magazin.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const route = params.get("rest_route");
  if (!route) return new Response(null, { status: 308, headers: { Location: "/magazin/" } });
  params.delete("rest_route");
  return wpRestResponse(handleWpRest(route, params), request.method);
}

export const HEAD = GET;

export function OPTIONS() {
  return wpRestPreflight();
}
