import "@/styles/globals.css";
import Navigation from "@/components/ui_elements/Navigation";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/layout";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
