import Nav from '../components/Nav.js'
import styled from 'styled-components'

const Cleanpage = styled.div`
  margin: 20;
  padding: 20;
  border: '1px solid #DDD';
`;

const Layout = (props) => (
  <Cleanpage>
    <Nav />
    {props.children}
  </Cleanpage>
)

export default Layout