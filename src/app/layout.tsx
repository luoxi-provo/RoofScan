export const metadata = {
  title: "Roof Measure — Roof Size & Pitch Estimator",
  description: "Estimate roof size and pitch from address using Google Geocoding + Solar APIs.",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
