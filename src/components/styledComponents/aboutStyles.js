import styled from "styled-components";
import heroBG from "../assest/image/about_hero.png"
import maskBg from "../assest/image/about_mask.png"

export const HeroBG = styled.div`
    min-height: 417px;
    background-image: url(${heroBG});
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
    filter: grayscale(1);
`

export const Hero = styled.div`
    min-height: 417px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .col-md-7 {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 64px;
        line-height: 75px;
        text-transform: capitalize;
        color: #FFFFFF;
        margin: 0px 0px 10px 61px;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-transform: capitalize;
        color: #C40667;
        margin: 0px 0px 10px 68px;
    }

    @media only screen and (max-width: 600px) {
        h1 {
            font-size: 5rem !important;
            line-height: 75px !important;
            margin: 0px 0px 10px 35px !important;
        }

        span {
            font-size: 1.5rem !important;
            line-height: 23px !important;
            margin: 0px 0px 10px 38px !important;
        }
    }
`

export const Mask = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background-image: url(${maskBg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    top: 0px;

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

    .subscribe {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .subscribe h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 75px;
        text-transform: capitalize;
        color: #FFFFFF;
        margin: 0px 0px 10px 61px;
    }

    .subscribe span {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-transform: capitalize;
        color: #C40667;
        margin: 0px 0px 10px 12px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        height: 47px;
        color: #FFFFFF !important;
        background: transparent !important;
        border: 1px solid #C40667;
        border-radius: 8px;
    }

    @media only screen and (max-width: 600px) {
        position: relative;
        top: -410px !important;

        .subscribe h1 {
            font-size: 30px !important;
            line-height: 75px !important;
            margin: 0px 0px 10px 35px !important;
        }

        form {
            width: 90vw;
            margin: 0px 30px 0px 35px;
        }
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .col-md-9{
        margin-left: 61px;
        max-width: 885px;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #ffffffd6;
    }

    a {
        color: #C40667;
        text-decoration: underline;
        font-weight: 500;

        &:hover {
            color: #C40667 !important;
        }
    }

    @media only screen and (max-width: 600px) {
        .col-md-9{
            margin-left: 35px;
            width: 90vw !important;
        }
    }
`