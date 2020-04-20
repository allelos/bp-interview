import fetch from "node-fetch";

import { Page, Categories } from "../components"

import { API_URL } from "../utilities";

export default ({ categories }) => {
  return (
    <Page title='Αρχική'>
      <Categories categories={categories} />
    </Page>
  );
};

export const getStaticProps = async () => {
  const getCategories = await fetch(`${API_URL}/categories`);
  const categories = await getCategories.json();

  return {
    props: { categories },
  };
};
