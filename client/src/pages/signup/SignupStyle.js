import styled from 'styled-components';

const SignupForm = styled("div")`
    text-align: center;

    .shippingInfoHead{
        font-size: 1.5rem;
        @media(max-width: 700px){
            font-size: 1rem;
        }
    }
    .userInfoHead {
        font-size: 1.5rem;
        @media(max-width: 700px){
            font-size: 1rem;
        }
    }

    .fillOut{
        font-size: 2rem;
        @media(max-width: 700px){
            font-size: 1rem;
        }
    }

    input {
        width: 40%;
        padding: 10px;
        margin: 20px;
        @media(max-width: 700px){
            width: 80%;
            font-size: .5rem;
        }
    }
    .userInfo {
        display: flex;
        margin-top: 30px;
        flex-direction: column;
    }
    .shippingInfo {
        display: flex;
        flex-direction: column;
    }
    .submitBtn {
        width: auto;
        font-size: 2rem;
        border-radius: 5px;
        margin-bottom: 50px;
        @media(max-width: 700px){
            font-size: 1rem;
        }
    }
    .submitBtn:hover {
        background-color: rgb(99, 180,245);
        color: white;
    }

`;

export default SignupForm;