import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #f4f5f7;
  padding: 16px;
  overflow: hidden;
  margin: 4px;

  height: 64px;

  a {
    font-size: 16px;
    font-weight: 500;
    color: inherit;
    text-decoration: none;
  }

  a:visited {
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Image = styled.div`
  width: 64px;
  height: 64px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Category = ({ id, title, image_url }) => (
  <Container>
    <Link href="/category/[id]/" as={`/category/${id}`}>
      <a>{title}</a>
    </Link>
    <Image>
      <img src={image_url} />
    </Image>
  </Container>
);

const Categories = ({ categories }) => (
  <Grid>
    {categories.map(({ id, ...category }) => (
      <Category key={id} id={id} {...category} />
    ))}
  </Grid>
);

export default Categories;
