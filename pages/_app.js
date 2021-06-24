import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo title="Movies Countdowner" {...SEO} />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
