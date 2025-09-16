
import { useState, useEffect } from "react";
import { PageTransition, SlideUp } from "./ui/animations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ChevronDown, 
  UserPlus,
  Users,
  Star,
  Clock,
  AlertCircle
} from "lucide-react";
import LeadCard from "./LeadCard";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed";
  source: string;
  assignedTo: string;
  created: string;
  lastContact: string;
  score: number;
}

const LeadManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  
  // Sample lead data
  const leads: Lead[] = [
    {
      id: 1,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      phone: "(555) 123-4567",
      company: "Acme Inc.",
      status: "qualified",
      source: "Website Form",
      assignedTo: "John Doe",
      created: "2023-06-15",
      lastContact: "2023-06-20",
      score: 8,
    },
    {
      id: 2,
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "(555) 987-6543",
      company: "Global Tech",
      status: "contacted",
      source: "LinkedIn",
      assignedTo: "Sarah Smith",
      created: "2023-06-12",
      lastContact: "2023-06-18",
      score: 7,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@techsolutions.com",
      phone: "(555) 456-7890",
      company: "Tech Solutions",
      status: "new",
      source: "Referral",
      assignedTo: "Robert Johnson",
      created: "2023-06-10",
      lastContact: "2023-06-10",
      score: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@nexus.co",
      phone: "(555) 789-0123",
      company: "Nexus Systems",
      status: "proposal",
      source: "Trade Show",
      assignedTo: "John Doe",
      created: "2023-05-28",
      lastContact: "2023-06-15",
      score: 9,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@innovate.io",
      phone: "(555) 234-5678",
      company: "Innovate Inc.",
      status: "negotiation",
      source: "Cold Call",
      assignedTo: "Emily Davis",
      created: "2023-05-20",
      lastContact: "2023-06-17",
      score: 8,
    },
    {
      id: 6,
      name: "Olivia Martinez",
      email: "olivia@quickserve.com",
      phone: "(555) 345-6789",
      company: "QuickServe",
      status: "closed",
      source: "Website Chat",
      assignedTo: "Mike Wilson",
      created: "2023-05-15",
      lastContact: "2023-06-10",
      score: 10,
    },
  ];

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get status badge color and label
  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-crm-light-blue text-crm-blue border-none">New</Badge>;
      case "contacted":
        return <Badge className="bg-crm-light-yellow text-crm-yellow border-none">Contacted</Badge>;
      case "qualified":
        return <Badge className="bg-crm-light-purple text-crm-purple border-none">Qualified</Badge>;
      case "proposal":
        return <Badge className="bg-crm-light-green text-crm-green border-none">Proposal</Badge>;
      case "negotiation":
        return <Badge className="bg-yellow-100 text-yellow-800 border-none">Negotiation</Badge>;
      case "closed":
        return <Badge className="bg-green-100 text-green-800 border-none">Closed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Lead counts by status
  const statusCounts = {
    all: leads.length,
    new: leads.filter(lead => lead.status === "new").length,
    contacted: leads.filter(lead => lead.status === "contacted").length,
    qualified: leads.filter(lead => lead.status === "qualified").length,
    proposal: leads.filter(lead => lead.status === "proposal").length,
    negotiation: leads.filter(lead => lead.status === "negotiation").length,
    closed: leads.filter(lead => lead.status === "closed").length,
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-crm-black">Lead Management</h1>
            <p className="text-crm-gray mt-1">Track and manage your leads efficiently</p>
          </div>
          <Button className="bg-crm-blue hover:bg-crm-blue/90">
            <UserPlus className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
        </div>

        {/* Summary cards */}
        <SlideUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Total Leads</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{statusCounts.all}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-blue flex items-center justify-center">
                  <Users className="h-5 w-5 text-crm-blue" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">New Leads</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{statusCounts.new}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-yellow flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-crm-yellow" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Hot Leads</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {leads.filter(lead => lead.score >= 8).length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-red flex items-center justify-center">
                  <Star className="h-5 w-5 text-crm-red" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Needs Attention</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">2</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-purple flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-crm-purple" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideUp>

        {/* Leads table/cards */}
        <SlideUp delay={0.1}>
          <Card className="border">
            <CardHeader className="px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <CardTitle className="text-base font-semibold">Lead Pipeline</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border rounded-md p-1">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => setViewMode("table")}
                    >
                      Table View
                    </Button>
                    <Button
                      variant={viewMode === "card" ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => setViewMode("card")}
                    >
                      Card View
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Filter className="mr-1 h-3 w-3" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="px-6 pb-1">
              <Tabs defaultValue="all">
                <TabsList className="h-9">
                  <TabsTrigger value="all" className="text-xs">
                    All ({statusCounts.all})
                  </TabsTrigger>
                  <TabsTrigger value="new" className="text-xs">
                    New ({statusCounts.new})
                  </TabsTrigger>
                  <TabsTrigger value="contacted" className="text-xs">
                    Contacted ({statusCounts.contacted})
                  </TabsTrigger>
                  <TabsTrigger value="qualified" className="text-xs">
                    Qualified ({statusCounts.qualified})
                  </TabsTrigger>
                  <TabsTrigger value="proposal" className="text-xs">
                    Proposal ({statusCounts.proposal})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <CardContent className="px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-crm-gray" />
                  <Input 
                    type="search" 
                    placeholder="Search leads..." 
                    className="pl-8 h-9 w-full"
                  />
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-9 text-xs">
                    Bulk Actions <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                  <Button size="sm" className="bg-crm-blue hover:bg-crm-blue/90 h-9 text-xs">
                    <Plus className="mr-1 h-3 w-3" /> Add Lead
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded-md" />
                  ))}
                </div>
              ) : viewMode === "table" ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Score</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium text-crm-gray">{lead.id}</TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{lead.company}</TableCell>
                          <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline" className="bg-crm-light-purple/50 text-crm-purple border-crm-purple/20">
                              {lead.score}/10
                            </Badge>
                          </TableCell>
                          <TableCell>{lead.assignedTo}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem className="text-crm-red">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
                  {leads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      name={lead.name}
                      email={lead.email}
                      phone={lead.phone}
                      company={lead.company}
                      status={lead.status}
                      score={lead.score}
                      nextAction={`Last contact: ${lead.lastContact}`}
                      nextActionDate={`Assigned to: ${lead.assignedTo}`}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </PageTransition>
  );
};

export default LeadManagement;
