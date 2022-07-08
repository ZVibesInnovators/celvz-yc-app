import styled from "styled-components";

export const HeroWrapper = styled.div`
    height: 50vh;
    background-color: #111;

    .mask {
        background: rgba(0, 0, 0,0.6);
        
        h1 {
            color: #FFF;
            font-weight: lighter;
            font-size: 35px;
            margin: 0px;
            font-family: 'Raleway', sans-serif;
        }

        label {
            text-transform: uppercase;
            color: #C40667;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 2px;
        }
    }
`