import styled from "styled-components";

const AuctionStyle = styled("div")`
.AuctionSubmit {
    display: flex;
    justify-content: center;
    button {
        width: 100px;
        margin-bottom: 30px;
    }
    button:hover {
        background-color: rgb(115, 174, 245);
    }
}
  #startingPrice {
    margin-bottom: 50px;
  }
  .catForm {
    margin-bottom: 20px;
  }
  h3 {
    text-align: center;
    margin-bottom: 50px;
  }
  form {
    margin: 0 auto;
    width: 80vw;
    align-items: center;
    border: 3px solid rgb(197, 97, 97);
    padding: 10px 5px;
    border-radius: 3px;
    background-color: white;
    margin: 0 auto 20px auto;
    width: 600px;
    padding: 30px;
    input[type=range] {
      height: 25px;
      -webkit-appearance: none;
      margin: 10px 0;
      width: 100%;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      box-shadow: 0px 0px 0px #000000;
      background: rgb(197, 97, 97);
      border-radius: 1px;
      border: 0px solid #000000;
    }
    input[type=range]::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid rgb(121, 10, 10);
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: rgb(235, 102, 102);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #2497E3;
    }
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      box-shadow: 0px 0px 0px #000000;
      background: #2497E3;
      border-radius: 1px;
      border: 0px solid #000000;
    }
    input[type=range]::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      width: 100%;
      height: 5px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #2497E3;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-fill-upper {
      background: #2497E3;
      border: 0px solid #000000;
      border-radius: 2px;
      box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-thumb {
      margin-top: 1px;
      box-shadow: 0px 0px 0px #000000;
      border: 1px solid #2497E3;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #A1D0FF;
      cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #2497E3;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #2497E3;
    }
    .extra-padding {
      padding: 0 0 30px 0;
      width: 100%;
    }
    .theForm {
      margin: 0 auto;
      margin-bottom: 30px;
      @media (max-width: 700px) {
        width: 80%;
        margin-top: 20px;
      }
      .title,
      .description,
      .ImageLink,
      .genderList {
        margin-bottom: 30px;
        width: 80%;
        text-align: left;
      }
    }
    .title {
      input {
        width: 100%;
      }
    }
    .description {
      textarea {
        width: 100%;
        height: 100px;
      }
    }
    .ImageLink {
      input {
        width: 100%;
      }
    }
    .selectGender {
      margin-bottom: 30px;
      list-style: none;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;


      li {
        float: left;
        margin-left: 30px;
      }

      li a {
        display: block;
        color: black;
        text-align: center;
        padding: 16px;
        text-decoration: none;
      }
    }
  }
      .title,
      .description,
      .ImageLink {
          @media(max-width: 700px) {
              input, textarea{
                  border: solid 1px gray;
              }
          }
      }
`;

export default AuctionStyle;
