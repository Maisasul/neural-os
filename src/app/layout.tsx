import { Epilogue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({ 
  subsets: ["latin"],
  variable: "--font-epilogue",
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" 
      className="dark"
    >
      <body className={`${epilogue.variable} ${spaceGrotesk.variable} font-consciousness bg-surface text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
