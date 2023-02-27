import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Layout from "@/global/layouts/Layout";
// pages/_app.js
import { Prompt } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Prompt({ weight:'400',subsets: ["latin","thai"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default MyApp;
