import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../components/layout/Layout";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top Reasons for Life Insurance Claim Rejection",
      date: "24 January 2025",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Best PSU Stocks in India",
      date: "21 December 2024",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Banking & Financial Services Fund",
      date: "15 December 2024",
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "INOX India IPO – Everything You Must Know",
      date: "13 December 2024",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Types of Banking Frauds – How to Prevent Them",
      date: "10 December 2024",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Popular Finance Podcasts in India",
      date: "30 November 2024",
      readTime: "5 min read",
    },
    {
      id: 7,
      title: "Gandhar Oil Refinery IPO – Everything You Must Know",
      date: "25 November 2024",
      readTime: "5 min read",
    },
    {
      id: 8,
      title: "IKEDA IPO – Everything You Must Know",
      date: "23 November 2024",
      readTime: "6 min read",
    },
    {
      id: 9,
      title: "Tata Technologies IPO – Everything You Must Know",
      date: "20 November 2024",
      readTime: "5 min read",
    },
    {
      id: 10,
      title: "Best Pet Insurance Policies in India",
      date: "18 November 2024",
      readTime: "5 min read",
    },
    {
      id: 11,
      title: "Best Fintech Stocks in India",
      date: "17 October 2024",
      readTime: "6 min read",
    },
    {
      id: 12,
      title: "Best Stocks under Rs.5 in India",
      date: "16 October 2024",
      readTime: "8 min read",
    },
  ];

  const currentPage = 1;
  const totalPages = 5;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <a href="/" className="hover:text-blue-600 transition-colors">
                Home
              </a>
              <span>›</span>
              <span className="text-gray-900 font-medium">Blogs</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              BLUESTOCK BLOG
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights on IPOs, investments, market
              trends, and financial strategies from our expert team.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                {/* Blog Image Placeholder with Gradient */}
                <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline">
                      Read More
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-12 space-x-2">
            <button
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
