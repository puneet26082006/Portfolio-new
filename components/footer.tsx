import Link from "next/link";
import { SITE } from "@/lib/site";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
const LINKS = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["The Wall", "/wall"],
];
export function Footer() {
  return (
    <footer className="reference-footer">
      <div className="reference-container">
        <div className="footer-grid">
          <div>
            <Link
              href="/"
              className="footer-monogram"
              aria-label="Puneet Saxena home"
            >
              ps<span>~</span>
            </Link>
            <p className="footer-quote">
              Simplicity is a great virtue but it requires hard work to achieve
              it and education to appreciate it.
            </p>
          </div>
          <div>
            <h3>Links</h3>
            <a href={SITE.resume} download>
              Download Resume
            </a>
            {LINKS.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h3>Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
          <div>
            <h3>Social</h3>
            <div className="footer-socials">
              <a
                href="https://github.com/puneet26082006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/puneet-saxena-b8594a325/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a href="mailto:puneetsaxena168@gmail.com" aria-label="Email">
                <FiMail />
              </a>
            </div>
            <a className="footer-email" href="mailto:puneetsaxena168@gmail.com">
              puneetsaxena168@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Puneet Saxena. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
