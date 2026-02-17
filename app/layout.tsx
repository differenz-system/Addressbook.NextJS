import "./globals.css";
import { AuthProvider } from "../providers/AuthProvider";
import ContactsHeader from "../components/layout/ContactsHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <ContactsHeader />

          <main className="flex flex-1 flex-col">
            {children}
          </main>

          <footer className="border-t bg-white py-6 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Address Book, All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
