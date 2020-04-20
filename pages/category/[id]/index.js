import { useMemo } from "react";
import fetch from "node-fetch";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { Page, Filters, Paging, Products } from "../../../components";

import { API_URL } from "../../../utilities";

const Title = styled.h1`
  margin: 0;
  margin-bottom: 8px;
`;

const Subtitle = styled.h4`
  margin: 0;
  margin-bottom: 32px;
  font-weight: 400;
`;

export default ({
  categoryTitle,
  productCount,
  products,
  paging,
  totalPages,
  hasPrevious,
  hasNext,
  queryFromServer,
}) => {
  const router = useRouter();

  const queryObj = useMemo(() => {
    return Object.keys(queryFromServer).reduce((query, item) => {
      return queryFromServer[item] && item !== "id"
        ? { ...query, [item]: queryFromServer[item] }
        : { ...query };
    }, {});
  }, [queryFromServer]);

  const FILTER_LINKS = [
    {
      query: { ...queryObj, sort: "title" },
      title: "Αλφαβητικά",
      active: queryObj["sort"] === "title",
    },
    {
      query: { ...queryObj, sort: "price" },
      title: "Τιμή",
      active: queryObj["sort"] === "price",
    },
    {
      query: { ...queryObj, order: "asc" },
      title: "Αύξουσα",
      active: queryObj["order"] === "asc",
    },
    {
      query: { ...queryObj, order: "desc" },
      title: "Φθήνουσα",
      active: queryObj["order"] === "desc",
    },
  ];

  const handlePaging = (page) => {
    if (router) {
      router.push(`/category/[id]`, {
        pathname: `/category/${router.query.id}`,
        query: {
          ...queryObj,
          page:
            page === "next"
              ? parseInt(paging) + 1
              : page === "previous"
              ? parseInt(paging) - 1
              : typeof page === "number" && page,
        },
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    handlePaging("next");
  };

  const handlePrev = (e) => {
    e.preventDefault();
    handlePaging("previous");
  };

  const pages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const handlePageClick = (e) => {
        e.preventDefault();
        handlePaging(i);
      };

      pageNumbers.push({
        onClick: handlePageClick,
        active: paging === i,
        id: i,
      });
    }
    return pageNumbers;
  };

  return (
    <Page title={categoryTitle}>
      <Title>{categoryTitle}</Title>
      <Subtitle>{productCount} προϊόντα</Subtitle>
      <Filters
        filters={FILTER_LINKS}
        href="/category/[id]"
        as={router.query.id}
      />
      <Products products={products} />
      <Paging
        next={handleNext}
        previous={handlePrev}
        pages={pages()}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </Page>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { sort, order, page, id } = query;
  const sorting = sort ? `&sort=${sort}` : "";
  const ordering = order ? `&order=${order}` : "";
  const paging = parseInt(page) || 1;

  // Api Calls
  const getCategory = fetch(`${API_URL}/categories/${id}`);

  const getProducts = fetch(
    `${API_URL}/categories/${id}/products?page=${paging}&limit=15${sorting}${ordering}`
  );

  const results = await Promise.all([getCategory, getProducts]);
  const [category, products] = await Promise.all(
    results.map((result) => result.json())
  );

  const { title: categoryTitle, products_count: productCount } = category;

  const totalPages = Math.ceil(productCount / 15);
  const hasPrevious = paging > 1;
  const hasNext = paging + 1 <= totalPages;

  return {
    props: {
      categoryTitle,
      productCount,
      products,
      paging,
      totalPages,
      hasPrevious,
      hasNext,
      queryFromServer: query,
    },
  };
};
