
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import LeadManagement from "@/components/LeadManagement";
import Analytics from "@/components/Analytics";
import UserManagement from "@/components/UserManagement";
import CommunicationCenter from "@/components/CommunicationCenter";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface IndexProps {
  activeTab?: "dashboard" | "leads" | "analytics" | "users" | "communications";
}

const Index = ({ activeTab = "dashboard" }: IndexProps) => {
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update current tab when activeTab prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-md bg-gradient-to-br from-crm-blue to-crm-purple flex items-center justify-center text-white font-bold text-3xl mb-4">
            C
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="animate-spin text-crm-blue h-5 w-5" />
            <span className="text-crm-gray font-medium">Loading CRM System</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 pt-20 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentTab === "dashboard" && <Dashboard />}
            {currentTab === "leads" && <LeadManagement />}
            {currentTab === "analytics" && <Analytics />}
            {currentTab === "users" && <UserManagement />}
            {currentTab === "communications" && <CommunicationCenter />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
