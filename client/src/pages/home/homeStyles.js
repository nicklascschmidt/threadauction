import styled from 'styled-components';

const PrettyHome = styled('div')`
    margin: auto;
    /* width: 50%; */
    text-align: center;
    /* height: 100vh; */
    margin-top: 150px;
    border: 1px solid black;
    @media(max-width: 700px) {
        width: 80%;
        margin-top: 20px;
    }
`;
const BootstrapContainer = styled('div')`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 768px) {
        width: 750px;
    }
    @media (min-width: 992px) {
        width: 970px;
    }
    @media (min-width: 1200px) {
        width: 1170px;
    }
`;


export { PrettyHome, BootstrapContainer };