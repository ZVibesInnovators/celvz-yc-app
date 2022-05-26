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
import { AuthProvider } from './contexts/AuthContext';
import AlertContextProvider from "./contexts/AlertContextProvider";



function App() {
  const history = createBrowserHistory({

  })
  return (
    <>
      <AlertContextProvider>
        <AuthProvider>
          <BrowserRouter history={history}>
            <div style={{ overflowX: "hidden" }}>
            <Navbar />
            <Routes>
              {routes.map((route, i) => {
                return <Route key={i} path={route.path} element={<route.component />} />
              })}
            </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </AlertContextProvider>
    </>
  );
}

export default App;
