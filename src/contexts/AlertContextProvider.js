import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertContext = React.createContext({
    showError: () => { },
    showAlert: () => { }
});

function AlertContextProvider(props) {
    const { children } = props;

    const showError = (message) => {
        toast.error(message);
    }


    const showAlert = (type, message) => {
        toast[type](message);
    }

    return (
        <>
            <AlertContext.Provider value={{ showError, showAlert }}>
                {children}
                <ToastContainer />
            </AlertContext.Provider>
        </>)
}

export default AlertContextProvider;