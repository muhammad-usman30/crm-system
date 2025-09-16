
import { useState, useEffect } from "react";
import { PageTransition, SlideUp } from "./ui/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  CreditCard, 
  Calendar, 
  Download, 
  PieChart as PieChartIcon
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("month");

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const leadSourceData = [
    { name: "Website", value: 35 },
    { name: "Referral", value: 25 },
    { name: "Social", value: 20 },
    { name: "Email", value: 15 },
    { name: "Event", value: 5 },
  ];

  const leadStatusData = [
    { name: "New", value: 30 },
    { name: "Contacted", value: 25 },
    { name: "Qualified", value: 20 },
    { name: "Proposal", value: 15 },
    { name: "Negotiation", value: 7 },
    { name: "Closed", value: 3 },
  ];

  const monthlyLeadsData = [
    { name: "Jan", leads: 65, closed: 20 },
    { name: "Feb", leads: 80, closed: 25 },
    { name: "Mar", leads: 70, closed: 30 },
    { name: "Apr", leads: 90, closed: 35 },
    { name: "May", leads: 100, closed: 40 },
    { name: "Jun", leads: 110, closed: 45 },
    { name: "Jul", leads: 120, closed: 50 },
  ];

  const conversionRateData = [
    { name: "Jan", rate: 18 },
    { name: "Feb", rate: 20 },
    { name: "Mar", rate: 22 },
    { name: "Apr", rate: 19 },
    { name: "May", rate: 24 },
    { name: "Jun", rate: 28 },
    { name: "Jul", rate: 32 },
  ];

  const salesPerformanceData = [
    { name: "John", sales: 120000 },
    { name: "Sarah", sales: 160000 },
    { name: "Mike", sales: 90000 },
    { name: "Emily", sales: 170000 },
    { name: "Robert", sales: 140000 },
  ];

  // Color arrays for different charts
  const LEAD_SOURCE_COLORS = ["#2C95FF", "#8B5CF6", "#22C55E", "#F59E0B", "#FF5252"];
  const LEAD_STATUS_COLORS = ["#2C95FF", "#8B5CF6", "#FF5252", "#F59E0B", "#22C55E", "#38BDF8"];
  
  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-crm-black">Analytics</h1>
            <p className="text-crm-gray mt-1">Insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-36 h-9">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <SlideUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">New Leads</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {isLoading ? "—" : "127"}
                  </p>
                  <p className="text-xs text-crm-green flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> 12% increase
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-blue flex items-center justify-center">
                  <Users className="h-5 w-5 text-crm-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {isLoading ? "—" : "24.8%"}
                  </p>
                  <p className="text-xs text-crm-green flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> 3.2% increase
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-purple flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-crm-purple" />
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Sales Value</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {isLoading ? "—" : "$680K"}
                  </p>
                  <p className="text-xs text-crm-green flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> 18% increase
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-green flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-crm-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Avg. Deal Size</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {isLoading ? "—" : "$24.5K"}
                  </p>
                  <p className="text-xs text-crm-red flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> 2% decrease
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-yellow flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-crm-yellow" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideUp>

        {/* Main charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead acquisition chart */}
          <SlideUp delay={0.1}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-semibold">Lead Acquisition</CardTitle>
                  <Tabs defaultValue="leads" className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2 h-8">
                      <TabsTrigger value="leads" className="text-xs">Leads</TabsTrigger>
                      <TabsTrigger value="closed" className="text-xs">Closed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyLeadsData}
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
                      <Legend 
                        iconType="circle" 
                        iconSize={8}
                        wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
                      />
                      <Bar 
                        dataKey="leads" 
                        name="New Leads" 
                        fill="#2C95FF" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20} 
                      />
                      <Bar 
                        dataKey="closed" 
                        name="Closed Leads" 
                        fill="#22C55E" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          {/* Conversion rate chart */}
          <SlideUp delay={0.2}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-semibold">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={conversionRateData}
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
                        formatter={(value) => [`${value}%`, 'Conversion Rate']}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        name="Conversion Rate"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 1, stroke: "#fff" }}
                        activeDot={{ r: 6, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>

        {/* Pie charts and sales performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lead Source Chart */}
          <SlideUp delay={0.3}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-semibold">Lead Sources</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={LEAD_SOURCE_COLORS[index % LEAD_SOURCE_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: 8, 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: 'none'
                        }}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right" 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ 
                          fontSize: 12, 
                          paddingLeft: 20,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          {/* Lead Status Chart */}
          <SlideUp delay={0.4}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-semibold">Lead Status</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {leadStatusData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={LEAD_STATUS_COLORS[index % LEAD_STATUS_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: 8, 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          border: 'none'
                        }}
                        formatter={(value) => [`${value}%`, 'Percentage']}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right" 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ 
                          fontSize: 12, 
                          paddingLeft: 20,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          {/* Sales Performance Chart */}
          <SlideUp delay={0.5}>
            <Card className="border">
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-semibold">Sales Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={salesPerformanceData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 40,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F6" />
                      <XAxis 
                        type="number" 
                        tick={{ fontSize: 12, fill: '#8E9196' }}
                        axisLine={{ stroke: '#F1F2F6' }}
                        tickLine={false}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
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
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                      />
                      <Bar 
                        dataKey="sales" 
                        fill="#2C95FF" 
                        radius={[0, 4, 4, 0]}
                        barSize={16}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </PageTransition>
  );
};

export default Analytics;
