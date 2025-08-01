import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import OnboardingWrapper from "./components/OnboardingWrapper";
import Onboarding from "./components/Onboarding";
import OnboardingTest from "./components/OnboardingTest";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import { SignIn, SignUp, AuthContainer } from "./components/comp_2_admin_side";
import BrokerComp from "./pages/BrokerComp";
import { AllBrokers, AllSharks } from "./components/comp_4_allbrokers";
import {
  UserSignup,
  UserSignin,
  TradingDashboard,
  MarketOverview,
  AccountSettings,
  UserRoute,
} from "./components/comp_5_userlogin&dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <OnboardingWrapper>
          <div className="App">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/onboarding-test" element={<OnboardingTest />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />
              <Route path="/admin/ipos" element={<AdminPage />} />
              <Route path="/admin/auth" element={<AuthContainer />} />
              <Route path="/admin/signin" element={<SignIn />} />
              <Route path="/admin/signup" element={<SignUp />} />

              <Route path="/blogs" element={<Blogs />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/compare-broker" element={<BrokerComp />} />
              <Route path="/all-brokers" element={<AllBrokers />} />
              <Route path="/all-sharks" element={<AllSharks />} />

              {/* Component 5: Customer Trading Platform Routes */}
              <Route path="/user-signup" element={<UserSignup />} />
              <Route path="/user-signin" element={<UserSignin />} />
              <Route
                path="/trading-dashboard"
                element={
                  <UserRoute>
                    <TradingDashboard />
                  </UserRoute>
                }
              />
              <Route
                path="/market-overview"
                element={
                  <UserRoute>
                    <MarketOverview />
                  </UserRoute>
                }
              />
              <Route
                path="/account-settings"
                element={
                  <UserRoute>
                    <AccountSettings />
                  </UserRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </OnboardingWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
