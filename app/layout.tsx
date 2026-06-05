import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ynotsolutions.com"),
  title: "YNot Solutions — DevOps Systems That Keep Shipping",
  description:
    "YNot Solutions builds and runs reliable DevOps infrastructure — CI/CD, cloud, Kubernetes, and automation for teams that want to ship faster.",
  openGraph: {
    title: "YNot Solutions — DevOps Systems That Keep Shipping",
    description:
      "Infrastructure that just works — so your team can focus on building, not firefighting.",
    type: "website",
    images: ["/og-image.svg"]
  },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("theme-color");
                  var valid = ["vibrant", "sand", "pastel", "black", "white", "cyan", "blue", "green"];
                  if (saved && valid.indexOf(saved) !== -1) {
                    document.documentElement.setAttribute("data-theme-color", saved);
                  } else {
                    document.documentElement.setAttribute("data-theme-color", "white");
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}

