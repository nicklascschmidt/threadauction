import styled from 'styled-components';

const HomeNav = styled('div')`
     display: flex;
     font-size: 1.5rem;
     font-family: 'Space Mono', monospace;
     border-bottom: 2px solid black;
     align-items: baseline;
     justify-content: space-around;
     margin-bottom: 40px;
     @media(max-width: 700px) {
         font-size: .5rem;
     }
   .login {
     order: 2;
     color: black;
     text-decoration: none;
     margin-left: 200px;
     @media(max-width: 700px){
       margin-left: 50px;
     }
   }
   .signup{
     text-decoration: none;
     color: black;
   }
   .logo{
     text-shadow:
          -1px -1px 0 #000,
          1px -1px 0 #000,
          -1px 1px 0 #000,
          1px 1px 0 #000;
       font-size: 2.5rem;
       text-decoration: none;
       color: red;
       padding: 10px;
       @media(max-width: 700px) {
         font-size: .8rem;
         padding-right: 3px;
         padding-left: 3px;
         text-shadow: none;
     }
   }
`;

export default HomeNav;