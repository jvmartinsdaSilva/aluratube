import styled from "styled-components";
import config from "../../config.json"

 export const StyledBanner = styled.div`
    width: 100vw;
    height: 300px;
    background-image: url(${config.banner});
    background-repeat:no-repeat;
    background-size: cover;
`