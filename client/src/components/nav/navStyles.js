import styled from 'styled-components';

const PrettyNav = styled('ul')`
      font-size: 1.5rem;
      display: flex;
      border-bottom: 2px solid red;
      @media(max-width: 700px) {
          font-size: .5rem;
      } 
    a {
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      flex: 1;
      text-decoration: none;
    }
    .logo{
        font-size: 2.5rem;
        background: red;
        color: white;
        text-align: center;
        @media(max-width: 700px) {
          font-size: .8rem;
          padding-right: 3px;
          padding-left: 3px;
          margin-left: 0;
      } 
    }
`;

export default PrettyNav;