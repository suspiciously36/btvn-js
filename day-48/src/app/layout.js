import Header from "@/components/Header/Header";
import Providers from "@/components/ThemeSwitch/providers";

export const metadata = {
  title: "F8 Portfolio",
  description: "My name is F8, this is my portfolio.",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
