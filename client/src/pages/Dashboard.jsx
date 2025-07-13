import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <div>
          <h1>IPO Dashboard</h1>
          <p>Welcome to your IPO investment portal</p>
        </div>

        <div>
          <div>
            <h3>Total Investments</h3>
            <p>₹2,45,000</p>
            <p>+15% from last month</p>
          </div>

          <div>
            <h3>Active IPOs</h3>
            <p>12</p>
            <p>3 new this week</p>
          </div>

          <div>
            <h3>My Applications</h3>
            <p>5</p>
            <p>2 pending approval</p>
          </div>

          <div>
            <h3>Portfolio Value</h3>
            <p>₹3,12,450</p>
            <p>+8.5% returns</p>
          </div>
        </div>

        <div>
          <div>
            <h2>Upcoming IPOs</h2>
            <div>
              <div>
                <div>
                  <h3>TechCorp Ltd</h3>
                  <p>Technology Sector</p>
                  <p>Opens: Jan 20, 2025</p>
                </div>
                <Button>View Details</Button>
              </div>
              <div>
                <div>
                  <h3>GreenEnergy Inc</h3>
                  <p>Renewable Energy</p>
                  <p>Opens: Jan 25, 2025</p>
                </div>
                <Button>View Details</Button>
              </div>
            </div>
          </div>

          <div>
            <h2>Recent Activities</h2>
            <div>
              <div>
                <p>Application Approved</p>
                <p>
                  Your application for FinTech Solutions IPO has been approved
                </p>
                <p>2 hours ago</p>
              </div>
              <div>
                <p>New IPO Available</p>
                <p>MedTech Innovations IPO is now open for applications</p>
                <p>1 day ago</p>
              </div>
              <div>
                <p>Payment Pending</p>
                <p>Complete payment for AutoTech IPO application</p>
                <p>2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
