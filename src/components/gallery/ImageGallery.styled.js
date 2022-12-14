import styled from 'styled-components';
export const List = styled.ul`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
