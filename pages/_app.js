import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
    
  );
}
