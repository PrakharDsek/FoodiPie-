import styled from "styled-components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
const OtherOptions = ({ optionName, optionDetail, path }) => {
  return (
    <Container>
      <OptionRight>
        <Name>{optionName}</Name>
        <Detail>{optionDetail}</Detail>
      </OptionRight>
      <Link to={path} target="__blank">
        <OpenInNewIcon />
      </Link>
    </Container>
  );
};

export default OtherOptions;

const Container = styled.div`
  width: 95%;
  height: 100%;
  border: 1px solid lightgray;
  text-align: start;
  padding: 1em;
  margin: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.4em;
  box-shadow: rgba(39, 32, 32, 0.15) 1.95px 1.95px 2.6px;
  & .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
export const Name = styled.h3`
  font-family: var(--kanti-font);
  font-size: large;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1px;
`;
export const Detail = styled.h5`
  font-family: var(--sans-font);
  font-size: medium;
  font-weight: 400;
`;
const OptionRight = styled.div`
  display: flex;
  flex-direction: column;
`;
