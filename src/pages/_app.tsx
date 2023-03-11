import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/globals.css";
import Layout from "@/shared-components/layouts/Layout";
// pages/_app.js
import { Prompt } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { AppProps } from "next/app";

// If loading a variable font, you don't need to specify the font weight
const prompt = Prompt({ weight: "400", subsets: ["thai", "latin"] });

const MyApp: AppType = ({ Component, pageProps, ...appProps }: AppProps) => {
  return (
    <Provider store={store}>
      {[`/login`].includes(appProps.router.pathname) ? (
        <main className={prompt.className}>
          <Component {...pageProps} />
        </main>
      ) : (
        <Layout>
          <main className={prompt.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      )}
    </Provider>
  );
};

export default MyApp;
