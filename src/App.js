import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Navbar from "./components/Navbar";
import { routes } from './routes';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import AlertContextProvider from "./contexts/AlertContextProvider";
import Footer from './components/Footer';
import MaintenancePage from "./pages/MaintenancePage";
import { useContext, useEffect } from 'react';
import _ from 'lodash';
import LiveChatContextProvider from "./contexts/LiveChatContext";



function App() {
  const history = createBrowserHistory({

  })
  return (
    <>
      <AlertContextProvider>
        <AuthProvider>
          <LiveChatContextProvider>
            <BrowserRouter history={history}>
              <div style={{ overflowX: "hidden" }}>
                <Navbar />
                <AppRouter />
                <Footer />
              </div>
            </BrowserRouter>
          </LiveChatContextProvider>
        </AuthProvider>
      </AlertContextProvider>
    </>
  );
}

export default App;


const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, i) => {
        return <Route key={i} path={route.path} element={<route.component />} />
      })}
      <Route path={"/*"} element={<MaintenancePage />} />
    </Routes>
  )
}