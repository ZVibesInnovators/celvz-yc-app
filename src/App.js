import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Navbar from "./components/Navbar";
import { routes } from './routes';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';



function App() {
  const history = createBrowserHistory({

  })
  return (
    <>
    <AuthProvider>
      <BrowserRouter history={history}>
        <Navbar />
        <Routes>
          {routes.map((route, i) => {
            return <Route key={i} path={route.path} element={<route.component />} />
          })}
        </Routes>

      </BrowserRouter>
    </AuthProvider>
      
    </>
  );
}

export default App;
