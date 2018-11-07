import styled from 'styled-components';

const PrettyHome = styled('div')`
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;

        display: inline-block;
        flex-direction: column;
        flex-wrap: wrap;
        text-align: center;

        .genderForm {
            width: 200px;
            flex-basis: auto;
            @media(max-width: 700px) {
                width: 80%;
                margin-top: 20px;
            }
        }
        .categoryForm {
            width: 300px;
            flex-basis: auto;
            @media(max-width: 700px) {
                width: 80%;
                margin-top: 20px;
            }
        }
        .category-align {
            text-align: left;
        }
        .gender-align {
            text-align: left;
        }
        .filter-margin {
            margin: 0 0 20px 0;
        }
`;

export default PrettyHome ;