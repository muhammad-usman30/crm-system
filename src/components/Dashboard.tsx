
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "./StatCard";
import LeadCard from "./LeadCard";
import RecentActivity from "./RecentActivity";
import { PageTransition, SlideUp, StaggeredChildren } from "./ui/animations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Zap, 
  Phone, 
  Mail, 
  PlusCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardOverview = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const leadData = [
    { name: "Jan", leads: 30 },
    { name: "Feb", leads: 40 },
    { name: "Mar", leads: 35 },
    { name: "Apr", leads: 50 },
    { name: "May", leads: 55 },
    { name: "Jun", leads: 80 },
    { name: "Jul", leads: 65 },
  ];

  const conversionData = [
    { name: "New", value: 35 },
    { name: "Contacted", value: 25 },
    { name: "Qualified", value: 20 },
    { name: "Proposal", value: 15 },
    { name: "Negotiation", value: 10 },
    { name: "Closed", value: 5 },
  ];

  const COLORS = ["#2C95FF", "#F59E0B", "#8B5CF6", "#22C55E", "#FF5252", "#38BDF8"];

  const activityData = [
    {
      id: 1,
      type: "email" as const,
      user: { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      target: { name: "Acme Inc.", type: "lead" as const },
      description: "Sent follow-up email regarding proposal",
      time: "10 minutes ago",
      isNew: true,
    },
    {
      id: 2,
      type: "call" as const,
      user: { name: "Sarah Smith", avatar: "https://i.pravatar.cc/150?img=5" },
      target: { name: "Jane Cooper", type: "lead" as const },
      description: "Scheduled a demo call for next Tuesday",
      time: "1 hour ago",
      isNew: true,
    },
    {
      id: 3,
      type: "meeting" as const,
      user: { name: "Robert Johnson", avatar: "https://i.pravatar.cc/150?img=8" },
      target: { name: "Global Tech", type: "customer" as const },
      description: "Quarterly review meeting completed",
      time: "3 hours ago",
    },
    {
      id: 4,
      type: "status" as const,
      user: { name: "Emily Davis" },
      target: { name: "Nexus Systems", type: "lead" as const },
      description: "Lead status changed from Contacted to Qualified",
      time: "Yesterday",
    },
    {
      id: 5,
      type: "task" as const,
      user: { name: "Mike Wilson" },
      description: "Created new task: Send pricing details",
      time: "Yesterday",
    },
  ];

  // Sample leads for the leads section
  const leads = [
    {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      phone: "(555) 123-4567",
      company: "Acme Inc.",
      status: "qualified" as const,
      nextAction: "Schedule follow-up call",
      nextActionDate: "Tomorrow, 2:00 PM",
      score: 8,
    },
    {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "(555) 987-6543",
      company: "Global Tech",
      status: "contacted" as const,
      nextAction: "Send proposal document",
      nextActionDate: "Friday, 11:00 AM",
      score: 7,
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Stats row */}
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value={isLoading ? "—" : "387"}
            delta={{ value: "8.2%", positive: true }}
            icon={<Users size={18} />}
            variant="blue"
            isLoading={isLoading}
          />
          <StatCard
            title="New Leads"
            value={isLoading ? "—" : "45"}
            delta={{ value: "12.5%", positive: true }}
            icon={<UserPlus size={18} />}
            variant="purple"
            isLoading={isLoading}
          />
          <StatCard
            title="Conversion Rate"
            value={isLoading ? "—" : "24.8%"}
            delta={{ value: "2.1%", positive: false }}
            icon={<TrendingUp size={18} />}
            variant="green"
            isLoading={isLoading}
          />
          <StatCard
            title="Deal Value"
            value={isLoading ? "—" : "$128,450"}
            delta={{ value: "18.3%", positive: true }}
            icon={<BarChart3 size={18} />}
            variant="yellow"
            isLoading={isLoading}
          />
        </StaggeredChildren>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SlideUp delay={0.1} className="lg:col-span-2">
            <Card className="border">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center">
                <CardTitle className="text-base font-semibold">Lead Performance</CardTitle>
                <Tabs defaultValue="6months" className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="30days" className="text-xs">30 Days</TabsTrigger>
                    <TabsTrigger value="6months" className="text-xs">6 Months</TabsTrigger>
                    <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={leadData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: '#8E9196' }}
                        axisLine={{ stroke: '#F1F2F6' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#8E9196' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: 'none'
                        }}
                        labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#2C95FF"
                        fill="url(#colorLeads)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2C95FF" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2C95FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          <SlideUp delay={0.2} className="lg:col-span-1">
            <RecentActivity activities={activityData} className="h-full" />
          </SlideUp>
        </div>

        {/* Recent Leads & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SlideUp delay={0.3} className="lg:col-span-2">
            <Card className="border">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center">
                <CardTitle className="text-base font-semibold">Recent Leads</CardTitle>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  View All <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid gap-4">
                  {leads.map((lead, index) => (
                    <LeadCard key={index} {...lead} />
                  ))}
                  <Button variant="outline" className="w-full mt-1 border-dashed text-crm-blue">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Lead
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          <SlideUp delay={0.4}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-5">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: 'none'
                        }}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ fontSize: 12, paddingLeft: 20 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>

        {/* Upcoming Tasks & Today's Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SlideUp delay={0.5}>
            <Card className="border">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-crm-yellow" />
                  <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-crm-blue hover:bg-crm-blue/90 h-auto py-3 px-4 flex-col items-center justify-center space-y-1">
                    <Phone className="h-5 w-5 mb-1" />
                    <span>Schedule Call</span>
                  </Button>
                  <Button className="bg-crm-purple hover:bg-crm-purple/90 h-auto py-3 px-4 flex-col items-center justify-center space-y-1">
                    <Mail className="h-5 w-5 mb-1" />
                    <span>Send Email</span>
                  </Button>
                  <Button className="bg-crm-green hover:bg-crm-green/90 h-auto py-3 px-4 flex-col items-center justify-center space-y-1">
                    <UserPlus className="h-5 w-5 mb-1" />
                    <span>Add Contact</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          <SlideUp delay={0.6}>
            <Card className="border">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-crm-blue" />
                  <CardTitle className="text-base font-semibold">Today's Schedule</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Calendar className="mr-1 h-3 w-3" /> View Calendar
                </Button>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                {[1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="flex items-start space-x-3 py-3"
                    style={{ borderTop: i > 1 ? '1px solid #F1F2F6' : 'none' }}
                  >
                    <div className="bg-crm-light-blue text-crm-blue rounded-md px-2 py-1 text-xs font-medium w-16 text-center">
                      {i === 1 ? "1:00 PM" : "3:30 PM"}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{i === 1 ? "Discovery Call" : "Team Meeting"}</h4>
                      <p className="text-xs text-crm-gray mt-1">
                        {i === 1 
                          ? "Initial discussion with Acme Inc. about their requirements" 
                          : "Weekly team sync to discuss ongoing deals and roadblocks"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardOverview;
