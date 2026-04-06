import type { Metadata } from "next";
import AuthClient from "../login/AuthClient";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join a private circle of considered men.",
};

export default function SignupPage() {
  return <AuthClient mode="signup" />;
}
