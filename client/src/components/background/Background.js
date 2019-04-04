import styled from 'styled-components';
import pattern from './gravel.png';

const Background = styled.div`
  background: url(${pattern}) repeat;
  min-height: 100vh;
  overflow-y: scroll;
  padding: 2rem 0;
`;

export default Background;
