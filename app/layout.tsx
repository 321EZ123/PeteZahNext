/* eslint-disable @next/next/no-page-custom-font */
import Script from "next/script";
import "./tw.css";
import GooglebotVerifier from "@/ui/googlebot-verifier";
import AdManager from "@/ui/ad-manager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full min-h-screen">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SHE360M0YP"
        />
        <Script id="google-analytics">
          {`(function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                "gtm.start": new Date().getTime(),
                event: "gtm.js",
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-WPH7NCG4");
            `}
        </Script>
        <Script id="google-analytics-datalayer" strategy="afterInteractive">
          {/* this just makes sure that Next doesn't check the code (trust me, it works) */}
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SHE360M0YP');
          `}
        </Script>

        <title>Unit Convertor</title>

        <AdManager />

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* eslint-disable-next-line @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        {/* Additional CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
        />
      </head>
      <body className="w-full h-full min-h-screen">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPH7NCG4"
            height="0"
            width="0"
            className="invisible hidden"
          ></iframe>
        </noscript>
        <GooglebotVerifier />
        {children}
      </body>
    </html>
  );
}
