import styled from "styled-components";
import youthIMG from "../assest/image/youths.png";
import pastIMG from "../assest/image/everbrite_banner_size2x2.png"
import maskIMG from "../assest/image/adsMask.png"
import dypIMG from "../assest/image/dyp2x2.png"

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