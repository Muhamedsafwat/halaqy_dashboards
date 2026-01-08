import { Cairo } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import NavBar from "@/components/layout/NavBar/NavBar";

const cairo = Cairo({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} flex flex-col min-h-screen`}>
        <main className="flex-1">
          <AuthProvider>
            <NavBar />

            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
