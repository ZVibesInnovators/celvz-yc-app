import styled from "styled-components";
import youthIMG from "../assest/image/youths.png";
import pastIMG from "../assest/image/everbrite_banner_size2x2.png"
import maskIMG from "../assest/image/adsMask.png"
import socialsFooterMaskIMG from "../assest/image/socialsFooterMask.png"
import socialsMask from "../assest/image/socialsMask.png"
import dypIMG from "../assest/image/dyp2x2.png"
import weareIMG from "../assest/image/blwMask.png"
import emojisIMG from "../assest/image/back-icons.png"
import phonesIMG from "../assest/image/phones.png"

export const YouthImg = styled.div`
    width: 100%;
    max-width: 555px;
    height: 420px;
    margin-right: 100px;
    background: url(${youthIMG});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: auto;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`
export const WeAreSection = styled.div`
    background: url(${weareIMG});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 550px;
    margin-top: 10px;
    color: white;
    padding-left: 60px;
    padding-top: 120px;
    margin-top: -51px;

    button {
        background: transparent !important;
        border-width: 0px;
        color: #C40667;
        font-style: italic;
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        text-transform: capitalize;
    }

    @media only screen and (max-width: 600px) {
        padding-left: 30px;
    }
`
export const AdsSection = styled.div`
    margin-top: -10px;
    min-height: 683px;
    background-color: #000;
    background-image: url(${pastIMG});
    background-size: contain;
    background-position: top left;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;

    .mask {
        background-image: url(${maskIMG});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        flex: 1;
        width: 103vw !important;
        height: 100%;

        .col-md-7 {
            margin-left: auto !important;
            display: flex;
            flex-direction: column;

            @media only screen and (max-width: 600px) {
                display: contents;
                 flex-direction: column-reverse !important;

                 .top {
                    margin-left: 10px !important;
                 }
            }

            .top {
                flex: 1;
                background-image: url(${dypIMG});
                background-size: contain;
                background-position: top;
                background-repeat: no-repeat;
                margin-top: 20px;
                margin-left: -100px;
                max-height: 421px;
            }
        }
        .footer {
            margin: 10px 20px 10px 20px;

            .date,
            .address {
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                line-height: 35px;
                text-transform: capitalize;
                color: #C40667;
                display: flex;
                align-items: center;
                margin: 0px;

                small {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;                    
                    text-transform: capitalize;
                    color: #FFFFFF;
                }
            }

            .venue {
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                line-height: 35px;
                text-transform: capitalize;
                color: #FFFFFF;
                margin: 0px;
            }

            .right {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }
`

export const FollowGodSection = styled.div`
    min-height: 588px;
    background-color: #000;
    background-image: url(${emojisIMG});
    background-size: contain;
    background-position: left top;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    .mask {
        background-image: url(${socialsMask});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        flex: 1;
        display: flex;
        width: 103vw !important;
        height: 100%;

        .col-md-6 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            text-align: left;
            padding: 63px;
        }

        h3 {
            font-style: normal;
            font-weight: 400;
            font-size: 40px;
            line-height: 47px;
            color: #FFF !important;
        }

        h1 {
            font-style: normal;
            font-weight: 800;
            font-size: 96px;
            line-height: 112px;
            color: #C40667;
        }

        .social-buttons {
            display: flex;
            flex-direction: row;
            width: 100%;
            max-width: 401px;
            justify-content: space-between;
            z-index: 5;

            button {
                padding: 10px;
                font-size: 45px;
                background: transparent;
                border: 0px;
                color: #D3006C;
                opacity: 0.6;
                margin-right: 20px;

                &:hover,
                &:focus {
                    opacity: 1 !important;
                    border: 0px;
                }
            }
        }

        .right {
            min-height: 530px;
            background-image: url(${phonesIMG});
            background-size: contain;
            background-position: bottom;
            background-repeat: no-repeat;
            margin-right: 30px;
        }

    }
    .footer-mask {
        height: 244px;
        z-index: 4;
        margin-top: -250px;
        background-image: url(${socialsFooterMaskIMG});
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
    }
`