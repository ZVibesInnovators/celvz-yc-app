import styled from "styled-components";
import maskBg from "../../../components/assest/image/mask.png"

export const EventDetailPageWrapper = styled.div`
    width: 100vw;
    min-height: calc(110vh + 100px);
    overflow-x: hidden;
    background-size: cover;
    background-position: top right;
    background-repeat: no-repeat;
    background-color: #000;
    position: relative;
    margin-top: -100px;
    z-index: 0;

    &.event {
        background-attachment: fixed;
        background-size: contain;
        background-position-x: center;

        @media only screen and (max-width: 600px) {
            background-size: cover;
        }

    }

    & .albumArt::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-image:${props => `url(${props.image})`};
        background-size: cover;
        background-position: top right;
        background-repeat: no-repeat;
        filter:${props => props.blur ? "grayscale(100%)" : "none"};
      }
`

export const Mask = styled.div`
    width: 100%;
    height: 100%;
    // background-image: url(${maskBg});
    background: rgb(0,0,0);
    background: -moz-linear-gradient(0deg, rgba(0,0,0,0.8449973739495799) 3%, rgba(0,0,0,0.7329525560224089) 45%, rgba(0,0,0,0.7189469537815126) 69%);
    background: -webkit-linear-gradient(0deg, rgba(0,0,0,0.8449973739495799) 3%, rgba(0,0,0,0.7329525560224089) 45%, rgba(0,0,0,0.7189469537815126) 69%);
    background: linear-gradient(0deg, rgba(0,0,0,0.8449973739495799) 3%, rgba(0,0,0,0.7329525560224089) 45%, rgba(0,0,0,0.7189469537815126) 69%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    overflow-y: auto;
    opacity: 1;
    backdrop-filter:${props => props.blur ? "blur(6px)" : "none"};

    &>.row {
        margin-top: 96px;
    }

    .form {
        &.ml-5{
            margin-left: 84px;
        }

        select,
        input {
            height: 47px;
            color: #FFFFFF;
            background: transparent !important;
            border: 1px solid #C40667;
            border-radius: 8px;
        }

        select,
        input.short {
            width: 245px !important;
        }

        button {
            height: 60px;
            width: 245px;
            color: #FFFFFF;
            border-width: 0px;
            background: #C40667;
            border-radius: 8px;
        }

        @media only screen and (max-width: 600px) {
            & {
                max-width: 90vw !important;
            }
            &.ml-5{
                margin-left: 20px;
                margin-right: 20px;
            }
        }
    }

    .hint {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-transform: capitalize;
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
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
    align-items: flex-start;
    margin-left: 85px;
    display: flex;
    flex-direction: column;
    width: 100%;
    & .next {
        margin-left: 0px;
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

export const NoLiveStreamWrapper = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    svg {
        font-size: 250px;
        color: #C40667
    }

    h5 {
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 45px;
        text-transform: inherit;
        text-align: center;
        color: #FFFFFF;

        @media only screen and (max-width: 600px) {
            font-size: 20px;
            line-height: 35px;
        }
    }
`