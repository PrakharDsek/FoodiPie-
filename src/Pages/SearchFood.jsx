import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
import { Heading } from "./Login";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom"
import { motion } from "framer-motion";
const SearchFood = () => {
    const NavigateTo=useNavigate()
    const handleSearch=(event) => {
        event.preventDefault()
        NavigateTo(`/food/search/result/${event.target.value}`)
    }
  return (
    <Container
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ delay: 0.5, ease: "easeInOut" }}
    >
      <Content>
        <Search>
          <Heading style={{ margin: "0.5" }}>Search for food</Heading>
          <SearchBarContainer>
            <SearchBar
              onclick={handleSearch}
              id="searchBar"
              placeholder={"Search for food"}
            />
          </SearchBarContainer>
          <RecentSearchRecords>
            <SearchName>Popoular search</SearchName>
            <HistorySearch>
              <SearchName>Somosas</SearchName>
              <SearchIcon />
            </HistorySearch>
          </RecentSearchRecords>
        </Search>
      </Content>
    </Container>
  );
};

export default SearchFood;

const Container = styled(motion.div)`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin: 2em 0;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Search = styled.div`
  background-color: #f9f9f6;
  min-height: 70vh;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 50%;
  @media (max-width:600px) {
    width:100%;

  }
  padding: 2em;
  margin: 4em 0;
  border: 1px solid lightgray;
  border-radius: 0.6em;
  text-align: center;
`;
const SearchBarContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 2em;
  margin: 0em 0;
`;
const RecentSearchRecords = styled.div`
  width: 85%;
  height: 100%;
  padding: 2em;
`;
const HistorySearch = styled.div`
  border: 1px solid lightgray;
  width: 100%;
  height: 100%;
  border-radius: 1em;
  padding: 0.2em;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  align-items: center;
  :hover {
    cursor: pointer;
    transform:translate(1.9);
    transition:1s ease-in transform;
  }
`;
const SearchName = styled.h5`
  margin: 1em;
  font-family: var(--sans-font);
  font-size: small;
  font-weight: 500;
`;
