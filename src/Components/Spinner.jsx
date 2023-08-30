import styled from "styled-components";
const Spinner = ({style}) => {
  return (
    <Container style={style}>
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    </Container>
  );
};

export default Spinner;
const Container = styled.div`
width:100vw;
height:100vh;
position: fixed;
top:50%;
bottom:50%;
z-index: 9999999;

  .loader {
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 10px;
  }

  .loader div {
    width: 8%;
    height: 24%;
    background: rgb(128, 128, 128);
    position: absolute;
    left: 50%;
    top: 30%;
    opacity: 0;
    border-radius: 50px;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    -webkit-animation: fade458 1s linear infinite;
    animation: fade458 1s linear infinite;
  }

  @-webkit-keyframes fade458 {
    from {
      opacity: 1;
    }

    to {
      opacity: 0.25;
    }
  }

  @keyframes fade458 {
    from {
      opacity: 1;
    }

    to {
      opacity: 0.25;
    }
  }

  .loader .bar1 {
    -webkit-transform: rotate(0deg) translate(0, -130%);
    -ms-transform: rotate(0deg) translate(0, -130%);
    transform: rotate(0deg) translate(0, -130%);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .loader .bar2 {
    -webkit-transform: rotate(30deg) translate(0, -130%);
    -ms-transform: rotate(30deg) translate(0, -130%);
    transform: rotate(30deg) translate(0, -130%);
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .loader .bar3 {
    -webkit-transform: rotate(60deg) translate(0, -130%);
    -ms-transform: rotate(60deg) translate(0, -130%);
    transform: rotate(60deg) translate(0, -130%);
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .loader .bar4 {
    -webkit-transform: rotate(90deg) translate(0, -130%);
    -ms-transform: rotate(90deg) translate(0, -130%);
    transform: rotate(90deg) translate(0, -130%);
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .loader .bar5 {
    -webkit-transform: rotate(120deg) translate(0, -130%);
    -ms-transform: rotate(120deg) translate(0, -130%);
    transform: rotate(120deg) translate(0, -130%);
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .loader .bar6 {
    -webkit-transform: rotate(150deg) translate(0, -130%);
    -ms-transform: rotate(150deg) translate(0, -130%);
    transform: rotate(150deg) translate(0, -130%);
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .loader .bar7 {
    -webkit-transform: rotate(180deg) translate(0, -130%);
    -ms-transform: rotate(180deg) translate(0, -130%);
    transform: rotate(180deg) translate(0, -130%);
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .loader .bar8 {
    -webkit-transform: rotate(210deg) translate(0, -130%);
    -ms-transform: rotate(210deg) translate(0, -130%);
    transform: rotate(210deg) translate(0, -130%);
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .loader .bar9 {
    -webkit-transform: rotate(240deg) translate(0, -130%);
    -ms-transform: rotate(240deg) translate(0, -130%);
    transform: rotate(240deg) translate(0, -130%);
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .loader .bar10 {
    -webkit-transform: rotate(270deg) translate(0, -130%);
    -ms-transform: rotate(270deg) translate(0, -130%);
    transform: rotate(270deg) translate(0, -130%);
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .loader .bar11 {
    -webkit-transform: rotate(300deg) translate(0, -130%);
    -ms-transform: rotate(300deg) translate(0, -130%);
    transform: rotate(300deg) translate(0, -130%);
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .loader .bar12 {
    -webkit-transform: rotate(330deg) translate(0, -130%);
    -ms-transform: rotate(330deg) translate(0, -130%);
    transform: rotate(330deg) translate(0, -130%);
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
`;
