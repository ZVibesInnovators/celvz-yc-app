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


function App() {
  const history = createBrowserHistory({

  })
  return (
    <>
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
    </>
  );
}

export default App;


const AppRouter = () => {
  const params = useLocation();

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