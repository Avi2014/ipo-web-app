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
import Blogs from "./pages/Blogs";
import { SignIn, SignUp } from "./components/comp_2_admin_side";
import BrokerComp from "./pages/BrokerComp";
import { AllBrokers, AllSharks } from "./components/comp_4_allbrokers";
import {
  UserSignup,
  UserSignin,
  TradingDashboard,
  MarketOverview,
  AccountSettings,
} from "./components/comp_5_userlogin&dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/compare-broker" element={<BrokerComp />} />
            <Route path="/all-brokers" element={<AllBrokers />} />
            <Route path="/all-sharks" element={<AllSharks />} />

            {/* Component 5: Customer Trading Platform Routes */}
            <Route path="/user-signup" element={<UserSignup />} />
            <Route path="/user-signin" element={<UserSignin />} />
            <Route path="/trading-dashboard" element={<TradingDashboard />} />
            <Route path="/market-overview" element={<MarketOverview />} />
            <Route path="/account-settings" element={<AccountSettings />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
