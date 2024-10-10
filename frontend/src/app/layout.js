import "./globals.css";
import Navbar from "./components/Navbar/page";
import Sidebar from "./components/Sidebar/page";
import Rightbar from "./components/Rightbar/page";


export const metadata = {
  title: "ANews",
  description: "Fastest news in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />
        {children}
        <Rightbar />
      </body>
    </html>
  );
}
