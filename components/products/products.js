import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 0px;
  overflow: hidden;
  margin: 4px;
  border-bottom: 1px solid #f4f5f7;
  height: 64px;
`;

const ProductLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: inherit;
  text-align: left;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Cover = styled.div`
  flex: 1 1 30%;
  height: 100%;

  > img {
    width: auto;
    max-height: 100%;
  }
`;

const Main = styled.div`
  flex: 1 0 70%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 16px;
`;

const PriceLink = styled(ProductLink)`
  font-weight: 700;
`;

const Product = ({ title, image_url, price, slug_path }) => {
  const router = useRouter();
  return (
    <Container>
      <Cover>
        <img src={image_url} alt={title} />
      </Cover>
      <Main>
        <Link
          href="/category/[id]/products/[...pid]"
          as={`${router.query.id}/products/${slug_path}`}
          passHref
        >
          <ProductLink>{title}</ProductLink>
        </Link>
        <Link
          href="/category/[id]/products/[...pid]"
          as={`${router.query.id}/products/${slug_path}`}
          passHref
        >
          <PriceLink>{price / 100} &euro;</PriceLink>
        </Link>
      </Main>
    </Container>
  );
};

const Products = ({ products }) =>
  products.length &&
  products.map(({ id, ...product }) => (
    <Product key={id} id={id} {...product} />
  ));

export default Products;
