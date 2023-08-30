import styled from "styled-components";

const FeedBacks = ({ name, date, feedback, rating, avatarUrl }) => {
  return (
    <Container>
      <div className="card">
        <label className="avatar">
          <img src={avatarUrl} />
        </label>
        <label className="info">
          <span className="info-1">{name}</span>
          <span className="info-2">{date}</span>
        </label>
        <div className="content-1">{feedback}</div>
        <div className="content-2">{"⭐".repeat(rating)}</div>
      </div>
    </Container>
  );
};

export default FeedBacks;

const Container = styled.div`
  width: 22%;
  margin:1em 1em;
  @media (max-width:900px) {
    width:40%;
  }
  @media (max-width:500px) {
    width:90%;
    margin:1em 0;
  }

  min-height: 100%;
  height:auto;
  .card {
      @media (max-width:500px) {
   padding:2em
  }
    width: 100%;
    min-height: 100%;
    height: auto;
    border-radius: 14px;
    padding: 0.3em;
    background-color:#f4f3ee;
    box-shadow: 2px 3px 3px #929191, 2px 3px 3px #232121;
  }

  .avatar {
    & img {
    width: 25%;
    height: 20%;
    display: inline-block;
        object-fit: cover;
  margin: 30px 15px 20px 25px;
    border-radius: 14px;
    }
  }

  .info {
    display: inline-block;
    vertical-align: top;
    margin-top: 33px;
    width: 85px;
  }

  .info-1{
    font-weight:500;
    font-family:var(--slow-font);
    letter-spacing: 1px;
    margin:0.7em 0;
    font-size: larger;
  }
  .info-2 {
    display: inline-block;
    height: 20px;
    width: 100%;
    font-family:var(--sans-font);
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0 0.1em;
    border-radius: 6px;
  }

  .info-2 {
    height: 11px;
    width: 50%;
    border-radius: 3px;
  }

  .content-1 {
    width: 80%;
    border-radius: 12px;
    font-family: var(--kanti-font);
    width:90%;
    height: auto;
    min-height: 50%;
    padding:2px;
    
    margin: 1em;
  }

  .content-2 {
    width: 60%;
    border-radius: 6px;

    height: 18px;
    margin: 10px 0 0 20px;
  }
`;
