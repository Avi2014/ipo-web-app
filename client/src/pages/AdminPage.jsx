import React from "react";
import { useLocation } from "react-router-dom";
import AdminRoutes from "../components/comp_2_admin_side/AdminRoutes";

const AdminPage = () => {
  const location = useLocation();

  // Pass the current path to AdminRoutes to determine which page to show
  const getCurrentPage = () => {
    if (location.pathname.includes("/admin/dashboard")) {
      return "dashboard";
    } else if (location.pathname.includes("/admin/ipos")) {
      return "ipos";
    }
    return "dashboard"; // default
  };

  return <AdminRoutes initialPage={getCurrentPage()} />;
};

export default AdminPage;
