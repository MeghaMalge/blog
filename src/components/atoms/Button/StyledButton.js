
import styled from 'styled-components'
  
const StyledButton = styled.button`
    color : ${props => props.text? props.text : "white"}  ;
   
    width : fit-content;
    padding : 8px 13px;
    border-radius:3px;

    opacity:${props=>props.disabled? "0.5":"1"};
`
 // background-color : ${props => props.bg? props.bg : "#404040"};
  
export default StyledButton;