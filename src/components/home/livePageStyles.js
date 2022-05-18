import styled from 'styled-components';
import discoverIMG from "../assest/image/live.png";
import maskIMG from "../assest/image/live-bg.png"

export const LiveShow = styled.div`
background: url(${discoverIMG});
// margin-top: -4px;
min-height: 983px;
// background-color: #000;
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
    width: 100vw !important;
    height: 100%;
    background-size: cover;
    display: flex;
    background-repeat: no-repeat;

    h2 {
        font-style: normal;
        line-height: 47px;
        
    }

    .live-txt {
        color: #FFF !important;
        margin-left: 30px;
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
`








// .discover-dyp {
//     color: #fff;
//     position: absolute;
//     height: 75px;
//     left: 53px;
//     top: 116px;

    
    
// }

// h2 {
//     font-weight: 700;
//     font-size: 44px;
// }

// .conference {
//     position: absolute;
// width: 286px;
// height: 42px;
// left: 3px;
// font-style: normal;
// font-weight: 400;
// font-size: 36px;
// line-height: 42px;
// text-align: center;
// text-transform: capitalize;
// }