import './globals.css';

export const metadata = {
  title: 'Vinayaga Construction | Premium Construction Services Chennai',
  description: 'Expert construction in Chennai — Residential, Commercial, Renovation, Interior Design and Architectural Planning by Civil Engineer Azhagar.',
  keywords: 'construction company Chennai, residential construction, commercial construction, interior design, renovation',
  icons: {
    icon: '/favicon.ico',   // 👈 ADD THIS LINE
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
