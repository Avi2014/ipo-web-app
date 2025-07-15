import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How to Subscribe to an IPO?",
      answer:
        "To subscribe to an IPO, you need to have a demat account and trading account. You can apply through your broker's platform, online banking, or mobile apps. Fill in the required details, select the number of shares, and make the payment.",
    },
    {
      id: 2,
      question: "Should I buy an IPO on the first day?",
      answer:
        "Buying an IPO on the first day can be risky due to high volatility. It's advisable to research the company thoroughly, check the grey market premium, and consider market conditions before investing.",
    },
    {
      id: 3,
      question: "How do you know if an IPO is good?",
      answer:
        "Evaluate the company's financials, business model, market opportunity, management quality, competitive position, and the IPO pricing. Check the DRHP (Draft Red Herring Prospectus) for detailed information.",
    },
    {
      id: 4,
      question: "How to check IPO start date?",
      answer:
        "IPO start dates are announced by the company and SEBI. You can check on our platform, company's official website, stock exchanges (BSE/NSE), or financial news websites for the latest IPO calendar.",
    },
    {
      id: 5,
      question: "What is the minimum amount to invest in IPO?",
      answer:
        "The minimum investment varies by IPO based on the lot size and price band. Typically, it ranges from ₹10,000 to ₹15,000 for retail investors. Check the specific IPO details for exact amounts.",
    },
    {
      id: 6,
      question: "Can I modify or cancel my IPO application?",
      answer:
        "Yes, you can modify or cancel your IPO application before the issue closes. However, once the issue closes, no modifications are allowed. Contact your broker for the modification process.",
    },
    {
      id: 7,
      question: "What happens if IPO is oversubscribed?",
      answer:
        "If an IPO is oversubscribed, shares are allotted through a lottery system. Retail investors have reservations, and allotment is done proportionally. Unallotted money is refunded to your account.",
    },
    {
      id: 8,
      question: "When will I receive the IPO shares?",
      answer:
        "IPO shares are typically credited to your demat account 1-2 days before the listing date. You'll receive an email confirmation and can check your demat account for the shares.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about IPO investments
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
