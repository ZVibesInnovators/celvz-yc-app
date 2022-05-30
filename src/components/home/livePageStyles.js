import styled from 'styled-components';
import discoverIMG from "../assest/image/live.png";
import maskIMG from "../assest/image/live-bg.png"

export const LiveShow = styled.div`
    margin-top: 100px;
    z-index: 2;
    position: relative;

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
        font-size: 36px;
        line-height: 42px;
        text-align: center;
        text-transform: capitalize;
        color: #FFFFFF;
        margin: 0px 0px 10px 68px;
    }
    @media only screen and (max-width: 600px) {
        h1{
            font-size: 34px;
            line-height: 35px;
        }
        span{
            font-size: 20px;
        }
    }
`

export const VideoWrapper = styled.div`
    width: 95%;
    height: 457px;
    margin-left: 62px;
    background: #141313;
    border: 1px solid #757474;
    

    @media only screen and (max-width: 767px) {
        margin-left: 22px;
        margin-bottom: 40px;
        margin-Nright: 22px;
    }
`

export const LiveChatWrapper = styled.div`
    padding: 0px 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .chat-messages-screen {
        flex: 1;
        border: 1px solid #C40667;
        border-radius: 8px;
        min-height: 339px;
        max-height: 350px;
        overflow-y: auto;
        margin-bottom: 42px;
    }

    input {
        background: transparent !important;
        border: 1px solid #C40667;
        border-radius: 8px;
        height: 60px;
        color: #FFF !important;
    }
    @media only screen and (max-width: 600px) {
        .chat-messages-screen{
           
        }
       
    }
`

export const ChatBubble = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px;

    .body {
        flex: 1;

        span {
            color: #FFF;
            font-size: 14px !important;
            margin: 0px 10px;
        }
        small {
            color: #C40667;
        }
    }

`