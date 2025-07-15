import UpcomingIPOs from "./UpcomingIPOs";
import FAQSection from "./FAQSection";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const IPOPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main IPO Listings */}
      <UpcomingIPOs />

      {/* FAQ Section */}
      <FAQSection />
      {/* Footer can be added here if needed */}
    </div>
  );
};

export default IPOPage;
