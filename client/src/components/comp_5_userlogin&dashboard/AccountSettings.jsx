import React, { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  Settings,
  User,
  LogOut,
  Activity,
  Shield,
  Eye,
  Palette,
  BarChart3,
  Globe,
  MessageSquare,
  FileText,
  History,
  Gift,
  Edit,
  Camera,
} from "lucide-react";

const AccountSettings = () => {
  const [portfolioBalance] = useState("$623,098.17");
  const [availableFunds] = useState("$122,912.50");
  const [activeTab, setActiveTab] = useState("Account");

  const [userProfile, setUserProfile] = useState({
    firstName: "Pratik",
    lastName: "Patil",
    dateOfBirth: "December 17, 1990",
    email: "pratikpatil@hotmail.com",
    phoneNumber: "(123) 456-7890",
    username: "WitttradeberLain",
    accountNumber: "4453728992",
    country: "India",
    cityState: "Pune, MH",
    streetAddress: "4517 Kothrud",
    companyName: "Designer Inc.",
    companyCityState: "Chicago, Illinois",
  });

  const [isEditing, setIsEditing] = useState({
    personal: false,
    address: false,
    employer: false,
  });

  const sidebarItems = [
    { id: "Account", icon: User, label: "Account", active: true },
    { id: "Notifications", icon: Bell, label: "Notifications & Messages" },
    { id: "Security", icon: Shield, label: "Security & Privacy" },
    { id: "Appearance", icon: Palette, label: "Appearance" },
    { id: "Chart", icon: BarChart3, label: "Chart Settings" },
    { id: "Navigation", icon: Globe, label: "Navigation Settings" },
    { id: "Quotes", icon: MessageSquare, label: "Quotes Preferences" },
    { id: "Documents", icon: FileText, label: "Documents" },
    { id: "Community", icon: MessageSquare, label: "Community Settings" },
    { id: "History", icon: History, label: "History" },
    { id: "Beneficiaries", icon: User, label: "Beneficiaries" },
    { id: "Rewards", icon: Gift, label: "Rewards" },
  ];

  const handleEdit = (section) => {
    setIsEditing((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSave = (section) => {
    // Save logic here
    setIsEditing((prev) => ({
      ...prev,
      [section]: false,
    }));
  };

  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Logo/Toggle */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              <Menu className="w-5 h-5 text-gray-400" />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div>
                <div className="text-sm font-medium">James Raymond</div>
                <div className="text-xs text-gray-400">Account: 4453728992</div>
              </div>
            </div>

            {/* Portfolio Info */}
            <div className="flex items-center gap-6 ml-8">
              <div>
                <div className="text-xs text-gray-400">Portfolio Balance</div>
                <div className="font-semibold">{portfolioBalance}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Available Funds</div>
                <div className="font-semibold">{availableFunds}</div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <Globe className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <Activity className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <Eye className="w-6 h-6 text-gray-400" />
          </div>
          <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div className="mt-auto space-y-4">
            <div className="p-2 bg-cyan-600 rounded-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
              <LogOut className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Settings Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Settings</h2>
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === item.id
                          ? "bg-cyan-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {activeTab === "Account" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <p className="text-gray-400 mt-2">
                      View and manage account details such as name, email
                      address, contact information, etc.
                    </p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm">
                    Deactivate Account
                  </button>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden">
                      <img
                        src="/api/placeholder/80/80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Account Number</div>
                    <div className="font-semibold">
                      {userProfile.accountNumber}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">
                      Personal Information
                    </h3>
                    <button
                      onClick={() =>
                        isEditing.personal
                          ? handleSave("personal")
                          : handleEdit("personal")
                      }
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing.personal ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        First Name
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.firstName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Last Name
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">{userProfile.lastName}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Date of Birth
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="date"
                          value="1990-12-17"
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.dateOfBirth}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Email Address
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">{userProfile.email}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Phone Number
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="tel"
                          value={userProfile.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.phoneNumber}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Username
                      </label>
                      {isEditing.personal ? (
                        <input
                          type="text"
                          value={userProfile.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">{userProfile.username}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Address</h3>
                    <button
                      onClick={() =>
                        isEditing.address
                          ? handleSave("address")
                          : handleEdit("address")
                      }
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing.address ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Country
                      </label>
                      {isEditing.address ? (
                        <input
                          type="text"
                          value={userProfile.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">{userProfile.country}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        City/State
                      </label>
                      {isEditing.address ? (
                        <input
                          type="text"
                          value={userProfile.cityState}
                          onChange={(e) =>
                            handleInputChange("cityState", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.cityState}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Street Address
                      </label>
                      {isEditing.address ? (
                        <input
                          type="text"
                          value={userProfile.streetAddress}
                          onChange={(e) =>
                            handleInputChange("streetAddress", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.streetAddress}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Employer */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Employer</h3>
                    <button
                      onClick={() =>
                        isEditing.employer
                          ? handleSave("employer")
                          : handleEdit("employer")
                      }
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing.employer ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Company Name
                      </label>
                      {isEditing.employer ? (
                        <input
                          type="text"
                          value={userProfile.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.companyName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        City/State
                      </label>
                      {isEditing.employer ? (
                        <input
                          type="text"
                          value={userProfile.companyCityState}
                          onChange={(e) =>
                            handleInputChange(
                              "companyCityState",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <div className="text-white">
                          {userProfile.companyCityState}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== "Account" && (
              <div className="text-center py-20">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab} Settings
                </h3>
                <p className="text-gray-400">
                  This section is under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
