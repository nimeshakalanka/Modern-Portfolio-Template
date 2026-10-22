import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactAside } from "@/components/sections/ContactAside";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} about internships, freelance work or collaborations.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        lede="Have a question, an opportunity or just want to say hello? Send a message and I'll get back to you."
      />
      <div className="container-page grid items-start gap-10 pb-24 sm:pb-32 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <ContactForm />
        <ContactAside />
      </div>
    </PageTransition>
  );
}
