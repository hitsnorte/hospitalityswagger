import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function forward(request: Request, params: { path?: string[] }) {
  const path = params?.path?.length ? params.path.join("/") : "";
  const url = new URL(request.url);
  const search = url.search || "";
  const target = `http://192.168.144.63:5001/${path}${search}`;

  // Copy headers from incoming request, preserving Authorization
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    // Skip host to avoid conflicts
    if (key.toLowerCase() === "host") return;
    // Trim header values to avoid accidental whitespace or quotes
    headers.set(key, String(value).trim());
  });

  // Forward the request to the target
  let resp: Response;
  try {
    resp = await fetch(target, {
      method: request.method,
      headers,
      // request.body is a ReadableStream — pass it through for non-GET
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    });
  } catch (err: any) {
    const message = err?.message ?? "Upstream fetch failed";
    return new NextResponse(JSON.stringify({ error: message }), { status: 502, headers: { "content-type": "application/json" } });
  }

  // DEBUG: log upstream target and a short preview of the response when in dev
  try {
    const previewClone = resp.clone();
    const previewText = await previewClone.text().catch(() => undefined);
    // limit what we log to avoid huge outputs
    console.log(`[proxy] ${request.method} -> ${target}  status=${resp.status} preview=${String(previewText)?.slice(0,200)}`);
  } catch (logErr) {
    // ignore logging failures
  }

  // Convert response headers to a plain object for NextResponse
  const responseHeaders = new Headers(resp.headers);

  // Create a streaming response mirroring the target
  const body = resp.body;
  return new NextResponse(body, { status: resp.status, headers: responseHeaders });
}

export async function GET(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}

export async function POST(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}

export async function PUT(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}

export async function DELETE(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}

export async function PATCH(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}

export async function OPTIONS(request: Request, context: any) {
  const params = await context.params;
  return forward(request, params);
}
