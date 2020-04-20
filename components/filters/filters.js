import styled from "@emotion/styled";
import Link from "next/link";

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  align-items: center;
`;

const Filter = styled.a`
  margin-left: 8px;
  text-decoration: none;
  border: 1px dashed #f4f5f7;
  padding: 4px 8px;
  color: ${({ active }) => (active ? "#ec1639" : "#555")};
  font-weight: 500;
`;

const Filters = ({ filters, href, as }) => {
  return (
    <FilterContainer>
      <span>Ταξινόμηση: </span>
      {filters.map(({ title, query, active }) => {
        return (
          <Link
            key={title}
            href={href}
            passHref
            as={{
              pathname: as,
              query,
            }}
          >
            <Filter active={active}>{title}</Filter>
          </Link>
        );
      })}
      <Link href={href} as={as} passHref>
        <Filter>Καθαρισμός</Filter>
      </Link>
    </FilterContainer>
  );
};

export default Filters;
