import styled from 'styled-components';

const ProfileNav = styled('div')`
  display: flex;
  font-size: 1.5rem;
  font-family: 'Space Mono', monospace;
  border-bottom: 2px solid black;
  align-items: baseline;
  justify-content: space-around;
 @media(max-width: 700px) {
     font-size: .5rem;
     margin-top: 30px;
  }

 .logo {
   text-shadow:
        -1px -1px 0  #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
   text-decoration: none;
   color: red;
   font-size: 2.5rem;
   @media (max-width: 700px) {
     text-shadow: none;
     font-size: .8rem;
   }
 }
 .create {
   text-decoration: none;
   color: black;
   @media(max-width: 700px) {

   }
 }
 .welcome {
   text-decoration: none;
   color: black;
 }
 .logout {
   text-decoration: none;
   color: black;
 }
 .notification {
   /* text-decoration: none; */
   color: red;
 }
`;

export default ProfileNav;