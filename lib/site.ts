import type { Route } from "next";
import { profile } from "@/data/profile";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteName = `${profile.name} | Portfolio`;

export const siteDescription = `${profile.name}, ${profile.tagline}. ${profile.headline}`;

export interface NavItem {
  href: Route;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
