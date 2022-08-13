import styled from 'styled-components';

export const LiveShow = styled.div`
    margin-top: 100px;
    z-index: 2;
    position: relative;

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 25px;
        text-transform: capitalize;
        color: #FFFFFF;
        margin: 20px 0px 20px 61px;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        text-align: center;
        text-transform: capitalize;
        color: #FFFFFF;
        margin: 0px 0px 0px 60px;
    }
    @media only screen and (max-width: 600px) {
        h1{
            font-size: 24px;
            line-height: 25px;
            margin: 20px 0px 10px 20px;
        }
        span{
            font-size: 16px;
            margin: 0px 10px 0px 20px;
            flex-wrap: wrap;
            text-align: left;
        }
    }
`

export const VideoWrapper = styled.div`
    width: 95%;
    height: 457px;
    margin-left: 62px;
    background: #141313;
    border: 1px solid #424040;
    

    @media only screen and (max-width: 767px) {
        margin: 0px 12px 10px 12px;
        height: 300px;
    }
`

export const LiveChatWrapper = styled.div`
    padding: 0px 20px;
    height: 85vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .chat-messages-screen {
        flex: 1;
        border: 1px solid #424040;
        border-bottom: 0px;
        border-top: 0px;
        min-height: 339px;
        // max-height: 750px;
        overflow-y: auto;
    }

    .input-wrapper,
    .header-wrapper {
        border: 1px solid #424040;
        border-top: 0px;
        background: #1e1e1e;
        min-height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        small {
            color: #d7d7d7;
        }

        .info {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding: 10px;
        }

        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-left: 10px;
            background-color: ${props => props.online ? "green" : "red"};
        }
    }

    .header-wrapper {
        border: 1px solid #424040;
        border-bottom: 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        h5 {
            color: #d7d7d7;
            margin: 0px;
        }
    }

    input {
        background: transparent !important;
        border: 0px;
        border-bottom: 1px solid #777;
        width: 95%;
        margin: 10px auto;
        color: #d7d7d7 !important;
        outline: none !important;
        font-size: 15px;

        &:focus {
            outline: none !important;
            box-shadow: none;
            border-bottom: 1px solid #C40667;
        }
    }
    @media only screen and (max-width: 600px) {
        margin-bottom: 50px;

        .chat-messages-screen{
           
        }
       
    }
`

export const ChatBubble = styled.div`
    margin: 10px;

    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .x-body {
        flex: 1;
        margin: 0px 5px;

        span {
            color: #8a8989;
            font-size: 13px !important;
            margin: 0px;
            text-align: justify;
        }
        small {
            color: #424040;
            margin: 0px 10px 0px 0px;
            font-weight: bold;
            font-size: 14px;
        }
    }

    .footer {
        border-bottom: 1px solid #262b2f;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: -10px;
    }

`

export const ChatDisabledWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        width: 95%;
        background: #424040;
        border: 0px;
        margin: 10px;
        align-self: center;
        color: #d7d7d7;
        font-size: 14px !important;

        &:hover {
            background: #C40667;
        }
    }

    span {
        font-size: 13px;
        color: #d7d7d7;
        margin: 0px;
        text-align: left;
        line-height: 17px;
        text-transform: inherit;
        text-align: center;
    }
`

export const LiveShowActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button:hover {
        background-color: #1e1e1e;
    }

    @media only screen and (max-width: 767px) {
        margin-bottom: 10px;

        &  button:first-child {
            margin-left: 10px !important;
        }
    }
`

export const OnAir = styled.div`
    padding: 0px 7px;
    border-radius: 5px;
    border: 2px solid #cc0100;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 10px 0px 10px;

    span {
        margin: 0px;
        color: #cc0100;
        font-size: 10px !important;
    }
`

export const Flicker = styled.div`
div {
  text-align:center;
  position:relative;
  border:5px solid #1086e8;
  width:400px;
  border-radius:20px;
  margin-left: auto;
  animation: border-flicker 2s linear infinite;

  @media only screen and (max-width: 600px) {
      width: 250px;
  }
}

h1 {
  color:#C40667;
  font-family: 'Raleway', sans-serif;
  font-size:64px;
  letter-spacing:10px;
  animation: text-flicker 3s linear infinite;
  margin-top: 10px;

  @media only screen and (max-width: 600px) {
    font-size:34px;
  }
}

#offset {
  animation: letter-flicker 2s linear infinite;
}

@keyframes text-flicker {
  0% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  
  2% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  8% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  9% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  12% {
    opacity:0.1;
    text-shadow: 0px 0px rgba(242, 22, 22, 1);
  }
  20% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  25% {
    opacity:0.3;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  30% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  70% {
    opacity:0.7;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  72% {
    opacity:0.2;
    text-shadow:0px 0px 29px rgba(242, 22, 22, 1)
  }
  
  77% {
    opacity:.9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
  100% {
    opacity:.9;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1)
  }
}

@keyframes border-flicker {
  0% {
    opacity:0.1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
  2% {
    opacity:1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
  4% {
    opacity:0.1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
  
  8% {
    opacity:1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
  70% {
    opacity:0.7;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
  100% {
    opacity:1;
    -webkit-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
-moz-box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
box-shadow: 0px 0px 78px 4px rgba(16,134,232,0.73);
  }
}

@keyframes letter-flicker {
  0% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  2% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  4% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  
  
  19% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  21% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  23% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  
  80% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  83% {
    opacity:0.4;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
  87% {
    opacity:1;
    text-shadow: 0px 0px 29px rgba(242, 22, 22, 1);
  }
}
`