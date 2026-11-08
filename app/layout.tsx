import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "../components/PwaRegister";
import Footer from "../components/Footer";

export const viewport: Viewport = {
  themeColor: "#0E1F1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trust-realestat.vercel.app"), // تأكد من تغيير الرابط لاحقاً إذا اختلف
  title: {
    default: "Trust Real Estate | مسقط وسلطنة عُمان",
    template: "%s | Trust Real Estate",
  },
  description:
    "حلول عقارية متكاملة، بيع، شراء، وإيجار العقارات، الفلل، والأراضي في مسقط وكافة ولايات سلطنة عُمان.",
  keywords: [
    "Trust Real Estate",
    "عقارات عُمان",
    "عقارات مسقط",
    "فلل للبيع مسقط",
    "عقارات سلطنة عمان",
    "أراضي للبيع مسقط",
    "أراضي سكنية المعبيلة",
    "إيجار شقق بوشر",
    "Oman Real Estate",
    "Muscat Real Estate",
  ],
  authors: [{ name: "Trust Real Estate" }],
  creator: "Trust Real Estate",
  publisher: "Trust Real Estate",
  applicationName: "Trust Real Estate",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Trust Real Estate",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ar_OM", // تم تغيير النطاق الجغرافي إلى عُمان
    url: "https://trust-realestate.vercel.app",
    title: "Trust Real Estate | سلطنة عُمان",
    description:
      "حلول عقارية متكاملة في سلطنة عُمان - بيع، شراء، واستثمار في الأراضي والفلل.",
    siteName: "Trust Real Estate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trust Real Estate, Muscat and Oman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Real Estate | عُمان",
    description: "حلول عقارية متكاملة في مسقط وسلطنة عُمان",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PwaRegister />
        {children}
        <Footer />
      </body>
    </html>
  );
}
