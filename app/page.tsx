import { redirect } from "next/navigation";

// Redirect the root path to /swagger. This is a server-side redirect so the
// default Next.js landing page is effectively removed and users are sent to
// the Swagger UI at /swagger.
export default function RootPage() {
  redirect("/swagger");
}
