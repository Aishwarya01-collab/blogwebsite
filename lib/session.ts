import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
}

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "mydigitalworld_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  const c = cookies();
  return getIronSession<SessionData>(c, sessionOptions);
}
