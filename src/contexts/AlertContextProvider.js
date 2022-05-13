import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertContext = React.createContext({
    showError: () => { }
});

function AlertContextProvider(props) {
    const { children } = props;

    const showError = (message) => {
        toast.error(message);
    }

    return (
        <>
            <AlertContext.Provider value={{ showError }}>
                {children}
                <ToastContainer />
            </AlertContext.Provider>
        </>)
}

export default AlertContextProvider;