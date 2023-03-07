import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from 'history';
import { useContext, useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, useLocation
} from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import AlertContextProvider from "./contexts/AlertContextProvider";
import { AuthProvider } from './contexts/AuthContext';
import LiveChatContextProvider from "./contexts/LiveChatContext";
import { MusicPlayerContextProvider } from "./contexts/MusicPlayerContext";
import MaintenancePage from "./pages/MaintenancePage";
import { routes } from './routes';
import React from 'react';
import Firebase from "./services/firebase";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1c1c1c',
      paper: '#424242'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5'
    }
  },
});

function App() {
  const history = createBrowserHistory({

  })
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertContextProvider>
          <AuthProvider>
            <MusicPlayerContextProvider>
              <LiveChatContextProvider>
                <BrowserRouter history={history}>
                  <div style={{ overflowX: "hidden" }}>
                    <Navbar />
                    <AppRouter />
                    <Footer />
                  </div>
                </BrowserRouter>
              </LiveChatContextProvider>
            </MusicPlayerContextProvider>
          </AuthProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;


const AppRouter = () => {
  const params = useLocation();
  useEffect(() => { 
    const firebase = new Firebase();
    firebase.initialize();
  }, [])

  useEffect(() => {
    // scroll to page top
    window.scrollTo(0, 0)
  }, [params])

  return (
    <Routes>
      {routes.map((route, i) => {
        return <Route key={i} path={route.path} element={<route.component />} />
      })}
      <Route path={"/*"} element={<MaintenancePage />} />
    </Routes>
  )
}