import styled from 'styled-components';
export const Description = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const Text = styled.p`
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  z-index: 1201;
  color: white;
`;
export const Img = styled.img`
  max-height: 700px;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalWindow = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
