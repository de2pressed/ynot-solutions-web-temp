import Link from "next/link";

export function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return <Link className={`btn ${variant}`} href={href}>{children}</Link>;
}
