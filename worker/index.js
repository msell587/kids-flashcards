// Sheet Worker: returns a gated coloring sheet only when the request has a valid teacher access code.
// Codes are stored as the TEACHER_CODES secret (comma-separated); sheets live in the SHEETS R2 bucket.
import { isGatedSheet } from "../sheet-access.js";

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    vary: "Origin",
  };
}

function codeIsValid(code, env) {
  const codes = (env.TEACHER_CODES || "").split(",").map(s => s.trim()).filter(Boolean);
  return typeof code === "string" && code.length > 0 && codes.includes(code);
}

function json(status, body, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request.headers.get("Origin"), env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST" || url.pathname !== "/sheet") return json(404, { error: "not found" }, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json(400, { error: "bad request" }, cors);
    }

    const path = typeof body?.path === "string" ? body.path : "";
    if (!isGatedSheet(path)) return json(404, { error: "not found" }, cors);
    if (!codeIsValid(body?.code, env)) return json(403, { error: "wrong code" }, cors);

    const object = await env.SHEETS.get(path);
    if (!object) return json(404, { error: "not found" }, cors);

    return new Response(object.body, {
      headers: {
        "content-type": "application/pdf",
        "cache-control": "private, no-store",
        ...cors,
      },
    });
  },
};
