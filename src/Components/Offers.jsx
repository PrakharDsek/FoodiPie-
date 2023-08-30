import styled from "styled-components"

const Offers = ({offerHeading ,offerDesc}) => {
  return (
    <Container>
        <Content>
            <Offer>
                <Heading>{offerHeading}</Heading>
                <Desc>{offerDesc}</Desc>
            </Offer>
        </Content>
    </Container>
  )
}

export default Offers

const Container=styled.div`
    width:20%;
    padding: 1em;
    margin:1em;
    height:100%;
    border: 1px solid lightgray;
    border-radius: 0.4em;
    @media (max-width:700px) {
        width:100%;
    }
`
const Content=styled.div`
    display:flex;
    flex-direction: column;
    /* align-items: center; */
    padding:0.2em;
`
const Offer=styled.div`
    display: flex;
    flex-direction:column;
`
const Heading=styled.h5`
    font-family:var(--secondary-font);
    line-height: 1px;
    letter-spacing: 1px;
    font-size: medium;
`
const Desc=styled.div`
    font-size: small;
    font-family: var(--sans-font);
    line-height: 1px;
`