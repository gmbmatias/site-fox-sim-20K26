export const dynamic = "force-dynamic";

export function GET() {
  const rawClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "pub-3918433594573040";
  const pubId = rawClient.startsWith("ca-") ? rawClient.replace("ca-", "") : rawClient;
  const body = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
