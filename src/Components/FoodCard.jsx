import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";

const FoodCardLoader = () => (
  <ContentLoader
    speed={1.5}
    width={300}
    height={400}
    viewBox="230"
    backgroundColor="#dfdfd3"
    foregroundColor="#f1f1ea"
  >
    <rect x="0" y="0" rx="5" ry="0" width="270" height="170" />
    <rect x="15" y="200" rx="5" ry="5" width="240" height="20" />
    <rect x="35" y="240" rx="5" ry="5" width="200" height="20" />
    <rect x="0" y="293" rx="5" ry="5" width="270" height="8" />
    <rect x="15" y="320" rx="5" ry="5" width="100" height="20" />
    <rect x="205" y="310" rx="5" ry="5" width="50" height="45" />
  </ContentLoader>
);

const FoodCard = ({
  productImage,
  productTitle,
  productDesc,
  productPrice,
  address,
  onClick,
  aciton,
  update
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <div className="card">
          <div className="card-img">
            <Link to={update ? `/seller/update/${address}`:!onClick ? `/food/${address}` : onClick}>
              {productImage ? (
                <img src={productImage} alt="Product" />
              ) : (
                <FoodCardLoader />
              )}
            </Link>
          </div>
          <div className="card-title">{productTitle}</div>
          <div className="card-subtitle">{productDesc}</div>
          <hr className="card-divider" />
          <div className="card-footer">
            <div className="card-price">
              <span>{productPrice ? "₹" : ""}</span> {productPrice}
            </div>
            <button
              className="card-btn"
              onClick={() => navigate(`/food/${address}`)}
            >
              {address ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                    <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                    <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                    <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                  </svg>
                </>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default FoodCard;

const Container = styled.div`
  margin: 2em;
`;
const Content = styled.div`
  .card {
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    --main-focus: #2d8cf0;
    width: 230px;
    height: 330px;
    background: var(--bg-color);
    border: 2px solid var(--main-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    gap: 10px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    position: relative;
  }

  .card:last-child {
    justify-content: flex-end;
  }

  .card-img {
    /* clear and add new css */
    transition: all 0.5s;
    display: flex;
    top: 0;
    left: 0;
    position: absolute;
    justify-content: center;
    align-items: center;
    & img {
      width: 100%;
      height: 80%;
    }
  }

  .card-title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: var(--font-color);
  }

  .card-subtitle {
    font-size: 14px;
    font-weight: 400;
    color: var(--font-color-sub);
  }

  .card-divider {
    width: 100%;
    border: 1px solid var(--main-color);
    border-radius: 50px;
  }

  .card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card-price {
    font-size: 20px;
    font-weight: 500;
    color: var(--font-color);
  }

  .card-price span {
    font-size: 20px;
    font-weight: 500;
    color: var(--font-color-sub);
  }

  .card-btn {
    height: 35px;
    background: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 5px;
    padding: 0 15px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .card-btn svg {
    width: 100%;
    height: 100%;
    fill: var(--main-color);
    transition: all 0.3s;
  }

  .card-img:hover {
    transform: translateY(-3px);
  }

  .card-btn:hover {
    border: 2px solid var(--main-focus);
  }

  .card-btn:hover svg {
    fill: var(--main-focus);
  }

  .card-btn:active {
    transform: translateY(3px);
  }
`;
