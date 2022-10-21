import * as React from "react"
import styled, {keyframes} from 'styled-components'
import "@fontsource/inter/600.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/200.css"
import "@fontsource/ibm-plex-mono"
import gradient1 from '../images/gradient.mp4'


const StyledDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  //padding-left: 150px;
  width: 100vw;
  height: 100vh;
  // padding: 30px
`

const HeaderDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: top;
  justify-content: left;
  padding-left: 0px;
  padding-top: 20px;
  width: 100vw;
  height: 100vh;
  // padding: 30px
`


const ResponsiveDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-right: 30px;
  padding-left: 30px;
  @media (max-width: 12000px) {
    flex-direction: column;
  }
`


const StyledHeading1 = styled.h1`
  //position: relative;
  //margin-top: 0;
  //margin-bottom: 64px;
  //margin: auto;
  margin-top: 0;
  max-width: 3200px;
  color: white;
  font-size: 40px;
  font-weight: 600;
  font-family: inter;

  @media (max-width: 700px) {
    font-size: 40px;
   }
   @media (max-width: 500px) {
    font-size: 37px;
   }
`

const StyledParagraph = styled.p`
  margin-top: 0;
  max-width: 100%;
  // max-width 80vw
  color: white;
  font-size: 40px;
  font-weight: 400;
  font-family: inter;
  text-align: center;
  @media (max-width: 700px) {
   font-size: 20px;
  }
`

const StyledVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  padding: 0;
  margin: 0;
`

const StyledLink = styled.a`
  //padding: 10px;
  //padding-left: 30px;
  //padding-right: 30px;
  background-color: transparent;
  //border: 2px white solid;
  border-radius: 500px;
  border: none;
  color: white;
  font-weight: 600;
  font-family: inter;
  text-decoration: none;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: #FFEA7C;
  }

  @media (max-width: 700px) {
    font-size: 18px;
   }
`
const horizontalAnimation = keyframes`
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
`
const HorizontalScrollText = styled.h2`
  max-width: 450px;
  color: white;
  font-size: 25px;
  font-weight: 200;
  font-family: "IBM Plex Mono";
  animation-name: ${horizontalAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`

const Footer = styled.h3`
  position: absolute;
  bottom: 20px;
  color: white;
  max-width: 100vw;
  font-size: 10px;
  font-weight: 400;
  font-family: inter;
  padding-left: 40px;
  padding-right: 40px;
  //font-family: "IBM Plex Mono";
  @media (max-width: 900px) {
    display: none;
  }
`

const Select = styled.select`
  font-size: 40px;
  font-weight: 400;
  font-family: inter;
  text-align: center;

  background: transparent;
  color: white;
  border-width: 0px;
  box-shadow: 0 1px 0 0 white;
  outline: none; border:none; border-bottom: 1px solid white;
  @media (max-width: 700px) {
   font-size: 20px;
  }
  //padding-left: 30px;
  //padding-right: 30px;
`

const Input = styled.input`
  background:transparent;
  border-color: white;
  color: white;
  width: 70%;
  height: 100%;
  font-size: 40px;
  font-weight: 400;
  font-family: inter;
  text-align: center;
  padding-right: 50px;
  //box-shadow: 0 1px 0 0 white;
  //outline: none; border:none; border-bottom: 1px solid white;
  &::placeholder {
    color:white;
    opacity: 0.5;
  }
  @media (max-width: 700px) {
   font-size: 20px;
   width: 60%;
  }
`

const ButtonInput = styled.input`
  width: 15%;
  background: transparent;
  border-color: white;
  color: white;
  margin-left: 0px;
  border: 0;
  height: 100%;
  font-size: 40px;
  font-weight: 400;
  font-family: inter;
  text-align: center;
  box-shadow: 1px 1px 1px 1px white;
  outline: white;
  border: white;
  @media (max-width: 700px) {
   font-size: 20px;
  }
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: #FFEA7C;
  }
  &:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
}
// markup
const IndexPage = () => {
    return (
    <div style={{height:'100%', width:'100%'}}>
        <style jsx global>{`
          body {
            margin: 0px;
            padding: 0px;
          }
        `}</style>

        <HeaderDiv>
            <ResponsiveDiv>
                <StyledHeading1>
                    THE HARVARD ADVOCATE<br/>EXPERIMENTAL LABS
                </StyledHeading1>
            </ResponsiveDiv>
        </HeaderDiv>

        <StyledDiv>
            <ResponsiveDiv>
                <div>
                <StyledParagraph>
                  Create &nbsp;
                  <Select name="selectList" id="selectList" class="selectList">
                    <option disabled selected value></option>
                    <option value="poetry">poetry</option>
                    <option value="fiction">fiction</option>
                    <option value="feature">feature</option>
                    <option value="art">art</option>
                  </Select>
                  &nbsp; about
                </StyledParagraph>
                <Input type="text" id="prompt" name="prompt" placeholder="something cool..."/><ButtonInput type="submit" name="go" id="go" value="go"/>
                </div>
            </ResponsiveDiv>
            <Footer><StyledLink href="mailto:labs@theharvardadvocate.com">
              EMAIL US.
          </StyledLink> 21 SOUTH ST CAMBRIDGE, MA 02138 | COPYRIGHT © THE HARVARD ADVOCATE 2022</Footer>
        </StyledDiv>

        <StyledVideo preload="auto" autoPlay autoplay muted loop>
            <source src={gradient1} type="video/mp4"/>
        </StyledVideo>
    </div>
    )
}

export default IndexPage
