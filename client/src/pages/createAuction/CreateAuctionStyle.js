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
    .theForm {
      margin: 0 auto;
      width: 50%;
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
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

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
