import NavbarClient from "./NavbarClient";
import { getSession } from "@/lib/session";

export default async function Navbar() {
  const session = await getSession();
  return <NavbarClient user={session.user} />;
}
