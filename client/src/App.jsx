import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import { SignIn, SignUp } from "./components/comp_2_admin_side";
import BrokerComp from "./pages/BrokerComp";
import { AllBrokers, AllSharks } from "./components/comp_4_allbrokers";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/compare-broker" element={<BrokerComp />} />
            <Route path="/all-brokers" element={<AllBrokers />} />
            <Route path="/all-sharks" element={<AllSharks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
