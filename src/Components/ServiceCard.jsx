import styled from "styled-components"

const ServiceCard = ({big ,details ,title ,image}) => {
  return (
    <Container big={big} className="serviceCard">
      <div className={big ? "big card-container" : "small card-container"}>

          <div className="card">
            <div className="img-content">
              <img src={image} alt="" />
            </div>
            <div className="content">
              <p className="heading">{title}</p>
              <p className="details">
                {details}
              </p>
       
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ServiceCard

const Container = styled.div`
  margin: 0;
  width:100%;
  height:100%;

  .card {
  }

  .card-container {
    width: ${(props) => {
        if (props.big) {
            "34vw"
        }else {
            "15vw"
        }
    }};
    height: 50vh;
    min-height:40vh;
    
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    position: relative;
  
  }

  .card-container::before {
    content: "";
    z-index: -1;
    position: absolute;
  }

  .card {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
  }

  .card .img-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card .img-content {
    width: 100%;
    height: 100%;

    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    & img {
        width:100%;
        object-fit: cover;
        height:100%;
    }
  }

  .card .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    color: #e8e8e8;
    padding: 20px;
    line-height: 1.5;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(50px);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card .content .heading {
    font-size: 32px;
    font-weight: 900;
    font-family: var(--kanti-font);
  }

  .card:hover .content {
    opacity: 1;
    transform: translateY(0);
  }

  .card:hover .img-content {
    scale: 2.5;
    rotate: 30deg;
    filter: blur(7px);
  }
  .details {
    font-family:var(--sans-font);
    width:100%;
  }

  .card:hover .img-content svg {
    fill: transparent;
  }
`;