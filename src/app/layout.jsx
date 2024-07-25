import "@/assets/css/globals.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat( {
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"]
} );

export const metadata = {
  title: "Mango",
};

export default function RootLayout( {children} ) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/mascot.ico" type="image/x-icon" />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
