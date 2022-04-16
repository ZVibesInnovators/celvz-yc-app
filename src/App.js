import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar"
import { routes } from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routes.map((route, i) => {
            return <Route key={i} path={route.path} element={<route.component />} />
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
