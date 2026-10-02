import { pageMetadata } from "@/lib/seo";
import { ContactPageContent } from "@/components/contact-page-content";
export const metadata = pageMetadata("Contact", "Contact Puneet Saxena for internships, projects, and collaborations.", "/contact/");
export default function ContactPage() {
  return <ContactPageContent />;
}
