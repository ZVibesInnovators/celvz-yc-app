import styled from "styled-components";
import maskBg from "../../components/assest/image/mask.png"

export const EventDetailPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #000;
    position: absolute;
    top: 0px;
`

export const Mask = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${maskBg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    overflow-y: auto;

    &>.row {
        margin-top: 96px;
    }

    .form.ml-5 {
        margin-left: 84px;

        input {
            height: 47px;
            color: #FFFFFF;
            background: transparent !important;
            border: 1px solid #C40667;
            border-radius: 8px;
        }
    }
`

export const Title = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 64px;
    line-height: 75px;
    text-transform: capitalize;
    color: #FFFFFF;
    margin-left: 85px;

    @media only screen and (max-width: 600px) {
        
        & {
            font-weight: 600 !important;
            font-size: 44px !important;
            line-height: 55px !important;
            margin: 0px 10px 0px 30px;
        }
    }
`

export const SubtitleWrapper = styled.div`
    align-items: center;
    margin-left: 85px;
    display: flex;
    flex-direction: row;
    width: 100%;
    & .next {
        margin-left: 24px;
    }

    @media only screen and (max-width: 600px) {
        & {
            margin-left: 20px;
            flex-direction: column !important;
            align-items: flex-start;
        }
        & .next {
            margin-left: 0px;
        }
    }
`

export const Subtitle = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.small ? "20px" : "36px"};
    line-height: ${props => props.small ? "23px" : "42px"};
    text-transform: capitalize;
    color: ${props => props.small ? "#C40667" : "#FFFFFF"};
`