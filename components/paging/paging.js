import styled from "@emotion/styled";

const ButtonContainer = styled.div`
  display: flex;
  padding: 32px 16px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  margin-left: 8px;
  color: ${({ active }) => (active ? "#ec1639" : "#555")};
`;

const PageNumbers = ({ pages }) =>
  pages.map(({ onClick, active, id }) => (
    <Button onClick={onClick} key={id} active={active}>
      {id}
    </Button>
  ));

const Paging = ({ next, previous, pages, hasNext, hasPrevious }) => {
  return (
    <ButtonContainer>
      <Button disabled={!hasPrevious} onClick={previous}>
        Προηγούμενη
      </Button>
      <PageNumbers pages={pages} />
      <Button disabled={!hasNext} onClick={next}>
        Επόμενη
      </Button>
    </ButtonContainer>
  );
};

export default Paging;
