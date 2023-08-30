import styled from "styled-components";
import videoFile from "../assets/FoodPie.mp4";

const HomeSlide = () => {
  return (
    <Container>
      <Content>
        <BackVideoSlide>
          <video autoPlay muted loop id="background-video">
            <source src={videoFile} type="video/mp4" />
          </video>
          <Headings>
            <FrontHeadings>Welcome to FoodePie</FrontHeadings>
            <FrontHeadingSecond>#Bhukkad point </FrontHeadingSecond>
          </Headings>
        </BackVideoSlide>
      </Content>
    </Container>
  );
};

export default HomeSlide;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
`;
const BackVideoSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  & #background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

const FrontHeadings = styled.h1`
  color: #fff;
  font-size: xxx-large;
  font-family: var(--quick-font);
  margin: 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5); /* Customize the text shadow properties */
`;
const FrontHeadingSecond = styled.h3`
  color: #fff;
  font-size: large;
  font-family: var(--quick-font);
  margin: 0;
  text-shadow: 2px 2px 4px rgba(195, 179, 179, 0.5); /* Customize the text shadow properties */
`;

const Headings = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
