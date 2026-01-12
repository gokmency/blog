import { redirect } from "next/navigation";

export default function Root() {
  // Middleware already redirects based on Accept-Language.
  redirect("/en");
}
