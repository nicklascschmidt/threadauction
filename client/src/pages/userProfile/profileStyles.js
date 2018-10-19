import styled from 'styled-components';

const PrettyProfile = styled('div')`
    margin: 0 auto;
    width: 50%;
    text-align: center;
    height: 100vh;
    margin-top: 150px;
    border: 1px solid black;
    @media(max-width: 700px) {
        width: 80%;
        margin-top: 20px;
    }
`;

export default PrettyProfile;