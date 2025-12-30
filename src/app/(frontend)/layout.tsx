import { Cairo } from "next/font/google";
import NavBar from "@/components/layout/NavBar/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex-1">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
