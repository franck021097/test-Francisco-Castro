import styled from "styled-components"


const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    padding-top: 20px;
    background-color: #f2f2f2;
    text-align: center;
    color: #262626;
    border-bottom: 1px solid #262626;
    font-size: 32px;
    position: fixed;
    top: 0;
    
`


const Header = () =>{
    return <HeaderContainer>Contactános</HeaderContainer>
}

export default Header