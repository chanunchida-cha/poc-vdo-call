import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Layout from "@/global/layouts/Layout";
// pages/_app.js
import { Prompt } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "@/stores/store";

// If loading a variable font, you don't need to specify the font weight
const prompt = Prompt({ weight: "400", subsets: ["thai", "latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <main className={prompt.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
};

export default MyApp;
