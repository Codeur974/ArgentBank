import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Connexion from "./pages/connexion/Connexion";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="connexion" element={<Connexion />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
