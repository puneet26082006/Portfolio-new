import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page-content";
export const metadata: Metadata = {
  title: "Let's Connect",
  description:
    "Contact Puneet Saxena for internships, projects, and collaborations.",
};
export default function ContactPage() {
  return <ContactPageContent />;
}
