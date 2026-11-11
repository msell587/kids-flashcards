// The Content Security Policy added to every page of the built site (see vite.config.js).
// GitHub Pages cannot send HTTP headers, so the policy is a <meta> tag. It is defence in depth:
// even if a bug let someone inject a script tag, the browser would refuse to talk to any server that is not listed here.
//
// Honest limits:
//   - 'unsafe-inline' is needed for scripts and styles because several pages still keep their code in the HTML.
//     Moving those into modules (next step in the README) lets this be tightened.
//   - frame-ancestors (clickjacking) cannot be set with a meta tag, only with a header.
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com", // cdnjs: the PDF maker (with integrity hashes)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  // The colouring-sheet gate: Apps Script answers from script.google.com and redirects to script.googleusercontent.com
  "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
  "frame-src 'self' blob:", // the PDF viewer shows a sheet from a blob: address
  "object-src 'self' blob:", // the browser's PDF viewer counts as an object
  "worker-src 'self'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// Puts the policy right after the viewport tag, before any script runs
export function addSecurityPolicy(html) {
  const tag = `<meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}">`;
  return html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n  ${tag}`);
}
