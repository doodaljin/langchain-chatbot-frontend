import SideNav from "./components/SideNav";
import "./globals.css";
import Head from 'next/head';

export const metadata = {
  title: "Langchain-chatbot",
  description: "Chat About Your Next Saas Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" /> 
        </Head>
      <body className="grid grid-cols-4 h-screen">
        <SideNav />
        <div className="col-span-3 bg-slate-700 overflow-scroll bg-[#6c757d]">
          {children}
        </div>
      </body>
    </html>
  );
}
