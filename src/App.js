import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useUserAuth } from "./context/userContext";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./ProtectiveRoute/ProtectedRoute";

function App() {
  const [token] = useUserAuth();

  return (
    <Router>
      <UserProvider>
        <Routes>
          {token === "null" || token === undefined ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Dashboard />} />

        </Routes>
      </UserProvider>
    </Router>
  );
}
export default App;
