import styled from "@emotion/styled";
import Router from "next/router";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  display: flex;
  flex: 1 0 50%;
  flex-direction: column;
  padding: 48px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  margin-bottom: 16px;
  letter-spacing: 1.2px;
`;

const Price = styled.h5`
  font-weight: 400;
  font-size: 18px;
  margin: 0;
  margin-bottom: 16px;
`;

const Desctiption = styled.div`
  margin: 0;
  padding-top: 24px;
`;

const Excerpt = styled.span`
  font-size: 11px;
  border-top: 1px dashed #f4f5f7;
  padding-top: 16px;
`;

const BackTo = styled.a`
  font-weight: 700;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 32px;
  cursor: pointer;
`;

const SingleProduct = ({
  title,
  imageUrl,
  price,
  description,
  excerpt,
  backLabel,
}) => (
  <Container>
    <Col>
      <img src={imageUrl} alt={title} />
    </Col>
    <Col>
      <BackTo onClick={() => Router.back()}>/ {backLabel} </BackTo>
      <Title>{title}</Title>
      <Price>{price / 100} &euro;</Price>
      <Desctiption dangerouslySetInnerHTML={{ __html: description }} />
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
    </Col>
  </Container>
);

export default SingleProduct;
