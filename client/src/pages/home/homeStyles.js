import styled from 'styled-components';

const PrettyHome = styled('div')`
        display: flex;
        flex-direction: column;
        align-items: center;
        .genderForm {
            width: 50%;
            margin: 30px;
            flex-basis: auto;
            @media(max-width: 700px) {
        width: 80%;
        margin-top: 20px;
    }
        }
        .categoryForm {
            width: 50%;
            margin-bottom: 30px;
            flex-basis: auto;
            @media(max-width: 700px) {
        width: 80%;
        margin-top: 20px;
    }
        }
`;

export default PrettyHome ;