import { ContactForm } from "@/components/ContactForm";
export default function ContactPage() {
  return (
    <main className="contact-page dark-panel">
      <section className="contact-hero">
        <div><p className="eyebrow">CONTACT / DEPLOYMENT REVIEW</p><h1>Tell us what you need to deploy, scale, or stabilize.</h1><p>Share a few details about your infrastructure, release process, or cloud environment. YNot Solutions will help map the next operational step.</p></div>
        <aside className="contact-aside"><span>01 / Audit current deployment path</span><span>02 / Identify stability and scale gaps</span><span>03 / Plan the implementation route</span></aside>
      </section>
      <ContactForm />
    </main>
  );
}
