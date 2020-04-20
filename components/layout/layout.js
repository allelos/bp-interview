import styled from "@emotion/styled";
import Logo from "../logo/bplogo";

const Container = styled.div``;
const InnerContainer = styled.div`
  max-width: ${({ maxWidth }) => maxWidth ? maxWidth : "768px"};
  margin: auto;
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <Logo />
    <InnerContainer {...props}>{children}</InnerContainer>
  </Container>
);

export default Layout;
