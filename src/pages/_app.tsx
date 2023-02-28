import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Layout from "@/global/layouts/Layout";
// pages/_app.js
import { Prompt } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const prompt = Prompt({
  weight: "400",
  subsets: ["latin", "thai", "vietnamese", "latin-ext"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <main className={prompt.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default MyApp;
