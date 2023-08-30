import styled from "styled-components";
import Food from "../assets/service1.jpg";
import Foo2 from "../assets/service2.jpg";
import Foo3 from "../assets/service3.jpg";
import Foo4 from "../assets/service4.jpg";
import Foo5 from "../assets/service5.jpg";
import ServiceCard from "./ServiceCard";
import { useInView } from "react-intersection-observer";
const Services = () => {
    const { ref: bigImage, inView: BigImageInView } = useInView();
  return (
    <Container>
      <Content className={BigImageInView ? "big-anim" : ""} ref={bigImage}>
        <ServicesDisplayer>
          <ServiceCard
            big={true}
            image={Food}
            details={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
            }
            title={"Somosas"}
          />
        </ServicesDisplayer>
        <ServiceDisplayer>
          <ServicesSmallDisplayer>
            <ServiceCard
              image={Foo2}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
            <ServiceCard
              image={Foo3}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
            <ServiceCard
              image={Foo4}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
          </ServicesSmallDisplayer>
          <SecondarySmallDisplayer>
            <ServiceCard
              big={false}
              image={Foo5}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
            <ServiceCard
              big={false}
              image={Food}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
            <ServiceCard
              big={false}
              image={Food}
              details={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, perspiciatis."
              }
              title={"Somosas"}
            />
          </SecondarySmallDisplayer>
        </ServiceDisplayer>
      </Content>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  .big-anim {
    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes slide-in-right {
      0% {
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
`;
const Content = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ServicesDisplayer = styled.div`
  width: 30vw;
  height: 100vh;
  display: flex;
  margin: 0;
  @media (max-width: 900px) {
    width: 90vw;
  }
  @media (max-width: 400px) {
    height: 50vh;
  }
  .big {
    height: 100vh;
    width: 35vw;
    @media (max-width: 900px) {
      width: 90vw;
    }

    & .card-container {
      width: 30vw;
      height: 10vh;
      border-radius: 1%;
      transition: transform 0.2s ease;
      margin-bottom: 1rem;
      margin: 0;
    }
  }
`;
const ServicesSmallDisplayer = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const SecondarySmallDisplayer = styled(ServicesSmallDisplayer)``;
const ServiceDisplayer = styled.div`
  display: flex;
  flex-direction:column;
  @media (max-width:700px) {
    flex-direction:row;
  }
  min-height: 100vh;
  height:auto;
  width: 89vw;
  margin: 0 5em;
`;
