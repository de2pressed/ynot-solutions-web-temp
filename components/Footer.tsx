import Link from "next/link";
import { navItems } from "@/lib/navigation";

const cats = ["CI/CD", "Cloud Infrastructure", "Kubernetes", "Automation", "Observability", "Managed Infrastructure"];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="eyebrow">OPERATIONAL DOCK</p>
          <h2>YNot Solutions</h2>
          <p>YNot Solutions builds and runs reliable DevOps infrastructure for teams that need to ship faster without firefighting.</p>
          <Link className="btn primary" href="/contact">Plan a Deployment</Link>
        </div>
        <div className="footer-list"><h3>Navigation</h3>{navItems.map(i => <Link key={i.href} href={i.href}>{i.label}</Link>)}</div>
        <div className="footer-list"><h3>Infrastructure</h3>{cats.map(c => <span key={c}>{c}</span>)}</div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} YNot Solutions</span><span>DevOps done better.</span></div>
    </footer>
  );
}
