import styled from 'styled-components';
import discoverIMG from "../assest/image/live.png";
import maskIMG from "../assest/image/live-bg.png"

export const LiveShow = styled.div`
background: url(${discoverIMG});
min-height: 983px;

background-size: cover;
background-position: cover;
background-repeat: no-repeat;
display: flex;
flex-direction: column;

.mask {
    background-image: url(${maskIMG});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex: 1;
    display: flex;
    width: 120vw;
    height: 167%;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 1;
    top: 0px;

    h2 {
        font-style: normal;
        line-height: 47px;
        
    }

    .live-txt {
        color: #FFF !important;
        margin-left: 30px;
        margin-top: 150px;
    }

    .youth-spy {
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 69px;
        text-transform: capitalize;
        color: #C40667;
        margin: 0px 0px 10px 315px;
    }

    .youth-con {
     position: absolute;
     width: 286px;
     height: 42px;
     font-style: normal;
     font-weight: 400;
     font-size: 36px;
     line-height: 55px;
     text-align: center;
     text-transform: capitalize;
    }

    #box {
        background: #141313;
        border: 1px solid #757474;
        width: 874px;
        height: 457px;
        margin-left: 40px;
    }

    .right {
        background-color: transparent !important;
        border-color: #d3006c;
        color: #696969;
        margin-left: 10px;
        flex: 2;
        // display: flex;
        margin-top: 680px;
        width: 350px;
        padding: 6px;
        border-radius: 5px;

    }

    button {
        padding: 50px;
        font-size: 90px;
        background: transparent;
        border: 0px;
        color: rgba(240, 249, 255, 0.842);
        opacity: 0.6;
        margin-left: 300px;
        width: 108px;
        height: 108px;
    }
`