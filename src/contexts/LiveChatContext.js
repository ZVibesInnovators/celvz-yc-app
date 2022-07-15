import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../services/api";
import { AlertContext } from "./AlertContextProvider";
import { AuthContext } from "./AuthContext";
import _ from "lodash";

export const LiveChatContext = React.createContext();

function LiveChatContextProvider(props) {
    const { children } = props;
    const { isLoggedIn, authData } = useContext(AuthContext);
    const { showError, showAlert } = useContext(AlertContext);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [liveStream, setLiveStream] = useState(null);
    const [population, setPopulation] = useState(0)
    const [sendingMessage, setSendingMessage] = useState(false)

    const messages = useMemo(() => {
        const v = _.uniqBy(chatMessages, function (msg) {
            return msg.commentId;
        })
        return v.reverse();
}, [chatMessages, liveStream])

const fetchMessages = useCallback(async () => {
    try {
        const api = new API();
        const { comments } = await api.request("get", `stream/${liveStream?._id}/comments?$include=user&$limit=${Math.pow(10, 5)}`);
        setChatMessages(comments.data.map(e => ({...e, color: '#' + Math.floor(Math.random() * 16777215).toString(16)})));
    } catch (error) {
        showError(error.message)
    }
}, [liveStream])

const sendMessage = async (e) => {
    try {
        e.preventDefault();
        if (!message) throw Error("Please type a message before sending")
        if (!liveStream) throw Error("Can not send message to an unknow channel")
        if (!authData) throw Error("You must be logged in to join the live chat")
        if(!liveStream.isLive) throw Error("Chat is closed. Live Stream has ended")
        setSendingMessage(true)
        const api = new API(authData.token);
        const res = await api.request("post", `stream/${liveStream._id}/comments`, {
            message,
            user: authData.user
        });
        setSendingMessage(false)
        setMessage("")
    } catch (error) {
        setSendingMessage(false)
        showError(error.message)
    }
}
// , [authData, liveStream, message]);

const handleNewMessage = useCallback((data) => {
    if (!messages.map(msg => msg.commentId).includes(data.commentId)) {
        setChatMessages((old) => [{...data, color: '#' + Math.floor(Math.random() * 16777215).toString(16)}, ...old])
    }
}, [messages, liveStream])

return (
    <>
        <LiveChatContext.Provider value={{
            fetchMessages,
            sendMessage,
            handleNewMessage,
            liveStream,
            setLiveStream,
            chatMessages: messages,
            population,
            setPopulation,
            sendingMessage,
            setSendingMessage,
            message,
            setMessage
        }}>
            {children}
        </LiveChatContext.Provider>
    </>)
}

export default LiveChatContextProvider;