import fetch from "node-fetch";

import { Page, SingleProduct } from "../../../../components";

import { API_URL } from "../../../../utilities";

export default ({
  title,
  image_url,
  price,
  description,
  categoryTitle,
  excerpt,
}) => (
  <Page title={title} maxWidth="1280px">
    <SingleProduct
      title={title}
      imageUrl={image_url}
      price={price}
      description={description}
      exceprt={excerpt}
      backLabel={categoryTitle}
    />
  </Page>
);

export const getServerSideProps = async ({ params }) => {
  const getProduct = await fetch(`${API_URL}/products/${params.pid}`);
  const product = await getProduct.json();

  const getCategory = await fetch(
    `${API_URL}/categories/${product.category_id}`
  );

  const { title: categoryTitle } = await getCategory.json();

  return {
    props: {
      ...product,
      categoryTitle,
    },
  };
};
