import styled from 'styled-components';

const Wrapper = styled('fragment')`
display: flex;
margin-right: 30%;
margin-left: 30%;
background-color: rgb(232, 234,237);
justify-content: center;
padding: 50px;
box-shadow: 15px 10px 10px gray;
  form {
    input{
      width: 100%;
      margin-bottom: 30px;
    }
    button {
      font-size: 1rem;
      border-radius: 5px;
    }
    button:hover {
      background-color: rgb(99, 180,245);
    }
  }
`;

export default Wrapper;