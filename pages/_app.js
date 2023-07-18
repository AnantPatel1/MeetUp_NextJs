import "../styles/globals.css";
import Layout from "../components/layout/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// whenever you want to apply something to the entire component/pages use this file
// the component in this is basically the component that keeps on changing as you change the url or navigate to new pages

export default MyApp;
