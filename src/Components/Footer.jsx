import { Link } from "react-router-dom";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
  return (
    <Container>
      <Content>
        <FooterUpperSet>
          <IconTray>
            <InstagramIcon /> <LinkedInIcon /> <TwitterIcon />
          </IconTray>
        </FooterUpperSet>
        <FooterMiddleSet>
          <LinksTray>
            <StyledLinks>Need Help</StyledLinks>
            <StyledLinks>Back Home</StyledLinks>
            <StyledLinks>Your Orders</StyledLinks>
          </LinksTray>
        </FooterMiddleSet>
        <FooterLowerSet>
          <CopyRights>All rights reserved &copy;FoodiePie</CopyRights>
        </FooterLowerSet>
      </Content>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 20%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color:#000000;
`;
const FooterUpperSet = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`;
const FooterMiddleSet = styled(FooterUpperSet)``;
const FooterLowerSet = styled(FooterUpperSet)``;
const IconTray = styled.div`
    display: flex;
    & .MuiSvgIcon-root {
        color:#ffffff;
        margin:2em;
        @media (max-width:500px) {
          margin:1px ;
        }
        :hover { 
            color:lightblue;
            cursor:pointer;
        }
    }
`;
const StyledLinks = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 2em;
  @media (max-width: 500px) {
    margin: 4px;
    font-size:small;
  }
  font-family:var(--sans-font) :hover {
    color: lightblue;
    cursor: pointer;
  }
`;
const LinksTray = styled.div`
    display:flex;
    justify-content:center;
    align-items:center
`;
const CopyRights = styled.h4`
    color:#ffff;
    font-family:var(--kanti-font);
`;
