import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import WelcomeSequence from "./WelcomeSequence";

export default async function WelcomePage() {
  const session = await getSession();
  
  if (!session.user) {
    redirect("/login");
  }

  // Derive a cinematic variant ID from the user's UUID
  const variantId = `VX-${session.user.id.substring(0, 6).toUpperCase()}`;

  return (
    <WelcomeSequence 
      name={session.user.name} 
      variantId={variantId} 
    />
  );
}
