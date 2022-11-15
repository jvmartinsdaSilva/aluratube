import styled from "styled-components";


export const StyledFavorites = styled.div`
 
    div{       
        display: inline-block;
        text-align: center;
        margin: 10px;
        margin-left: 30px;
    }
    
    img{
        border-radius: 50%;
        border: 2px solid ${({theme}) => theme.borderBase};
        padding: 1px;
    }

    a{
        color: ${({theme}) => theme.textColorBase};
    }

    h2{
        margin: 25px;
        font: bold 18px arial ;
    }

`