import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="Movies Countdowner"
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME}
        description="Get Countdown of all the upcoming movies this year , with full information about there cast ,crew, budget and much more"
        {...SEO}
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
