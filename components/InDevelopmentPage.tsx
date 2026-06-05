import Link from "next/link";
export function InDevelopmentPage({ title }: { title: string }) {
  return (
    <main className="placeholder-page dark-panel">
      <section>
        <p className="eyebrow">YNOT SOLUTIONS / SYSTEM PAGE</p>
        <h1>{title} is in development.</h1>
        <p>This section is being shaped into a more complete view of YNot Solutions’ DevOps systems work. For now, start with the homepage or contact us about your infrastructure.</p>
        <div className="button-row"><Link className="btn primary" href="/">Return Home</Link><Link className="btn secondary" href="/contact">Contact YNot</Link></div>
      </section>
    </main>
  );
}
