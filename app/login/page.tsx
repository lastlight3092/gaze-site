import type { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Access your private GAZE account.",
};

export default function LoginPage() {
  return <AuthClient mode="login" />;
}
