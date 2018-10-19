import styled from 'styled-components';

const Wrapper = styled('section')`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 768px) {
      .container {
        width: 750px;
      }
    }
    @media (min-width: 992px) {
      .container {
        width: 970px;
      }
    }
    @media (min-width: 1200px) {
      .container {
        width: 1170px;
      }
    }
`;

const LoginCard = styled('div')`
    background-color: darkgrey;
    padding: 3rem;
    width: 30%;
    max-width: 15rem;
    margin: 10vh auto;
    text-align: center;
`;

const Input = styled('input')`
    background-color: white;
    padding: 5px;
    width: 5rem;
    margin: 10px;
`;

export { Wrapper, LoginCard, Input };