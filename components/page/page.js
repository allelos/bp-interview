import Head from "next/head";

import Layout from "../layout/layout";

const Page = ({ children, title, maxWidth }) => (
  <Layout maxWidth={maxWidth}>
    <Head>
      <title>BestPrice | {title}</title>
    </Head>
    {children}
  </Layout>
);

export default Page;
