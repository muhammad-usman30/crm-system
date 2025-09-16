import { useState, useEffect } from "react";
import { PageTransition, SlideUp } from "./ui/animations";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Calendar,
  Plus,
  FileText,
  Clock,
  ChevronRight,
  Search,
  Settings,
  Filter,
  Users
} from "lucide-react";

interface Communication {
  id: number;
  type: "email" | "call" | "meeting" | "note";
  subject: string;
  content: string;
  contact: {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    company?: string;
  };
  date: string;
  status: "sent" | "received" | "scheduled" | "completed" | "draft";
}

const CommunicationCenter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("emails");
  
  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample communications data
  const communications: Communication[] = [
    {
      id: 1,
      type: "email",
      subject: "Proposal for Enterprise Solution",
      content: "Dear Mr. Cooper, I'm writing to follow up on our recent meeting and to provide you with our detailed proposal for the enterprise solution we discussed...",
      contact: {
        name: "Robert Cooper",
        email: "robert.cooper@acmeinc.com",
        avatar: "https://i.pravatar.cc/150?img=3",
        company: "Acme Inc."
      },
      date: "Today, 10:25 AM",
      status: "sent"
    },
    {
      id: 2,
      type: "email",
      subject: "RE: Product Demo Request",
      content: "Thank you for your interest in our product. I would be happy to schedule a demo at your convenience...",
      contact: {
        name: "Sarah Johnson",
        email: "sarah.j@globaltech.co",
        avatar: "https://i.pravatar.cc/150?img=5",
        company: "Global Tech"
      },
      date: "Yesterday, 3:45 PM",
      status: "sent"
    },
    {
      id: 3,
      type: "call",
      subject: "Initial Discovery Call",
      content: "Discussed company needs and potential solutions. Client showed interest in our premium tier.",
      contact: {
        name: "Michael Brown",
        phone: "(555) 123-4567",
        company: "Innovate LLC"
      },
      date: "Jun 20, 2023, 2:00 PM",
      status: "completed"
    },
    {
      id: 4,
      type: "meeting",
      subject: "Product Demonstration",
      content: "Scheduled a virtual demonstration of our platform. Will focus on analytics and reporting features.",
      contact: {
        name: "Jessica Miller",
        email: "j.miller@nexussystems.io",
        phone: "(555) 987-6543",
        avatar: "https://i.pravatar.cc/150?img=9",
        company: "Nexus Systems"
      },
      date: "Tomorrow, 11:00 AM",
      status: "scheduled"
    },
    {
      id: 5,
      type: "note",
      subject: "Client Requirements Note",
      content: "Client requires integration with their existing SAP system. Need to confirm with our technical team if this is possible.",
      contact: {
        name: "David Wilson",
        company: "Wilson & Partners"
      },
      date: "Jun 18, 2023, 5:30 PM",
      status: "completed"
    },
    {
      id: 6,
      type: "email",
      subject: "Quarterly Newsletter - Summer 2023",
      content: "Draft of our quarterly newsletter to be sent to all clients. Highlights include new features, upcoming webinars, and customer success stories.",
      contact: {
        name: "All Clients",
        email: "newsletter@crm.com",
      },
      date: "Not sent yet",
      status: "draft"
    },
  ];

  // Get icon based on communication type
  const getCommunicationIcon = (type: Communication["type"]) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      case "note": return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Get color based on communication type
  const getCommunicationColor = (type: Communication["type"]) => {
    switch (type) {
      case "email": return "bg-crm-light-blue text-crm-blue";
      case "call": return "bg-crm-light-green text-crm-green";
      case "meeting": return "bg-crm-light-purple text-crm-purple";
      case "note": return "bg-gray-100 text-gray-600";
    }
  };

  // Get status badge
  const getStatusBadge = (status: Communication["status"]) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-crm-light-green text-crm-green border-none">Sent</Badge>;
      case "received":
        return <Badge className="bg-crm-light-blue text-crm-blue border-none">Received</Badge>;
      case "scheduled":
        return <Badge className="bg-crm-light-yellow text-crm-yellow border-none">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-crm-light-purple text-crm-purple border-none">Completed</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-600 border-none">Draft</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Filter communications by type
  const emailCommunications = communications.filter(c => c.type === "email");
  const callCommunications = communications.filter(c => c.type === "call");
  const meetingCommunications = communications.filter(c => c.type === "meeting");
  const noteCommunications = communications.filter(c => c.type === "note");

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-crm-black">Communication Center</h1>
            <p className="text-crm-gray mt-1">Manage all your client communications in one place</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-dashed">
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
            <Button className="bg-crm-blue hover:bg-crm-blue/90">
              <Send className="mr-2 h-4 w-4" /> Compose
            </Button>
          </div>
        </div>

        {/* Communication stats */}
        <SlideUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Total</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{communications.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-blue flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-crm-blue" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Emails</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{emailCommunications.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-green flex items-center justify-center">
                  <Mail className="h-5 w-5 text-crm-green" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Calls</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{callCommunications.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-purple flex items-center justify-center">
                  <Phone className="h-5 w-5 text-crm-purple" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Meetings</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{meetingCommunications.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-yellow flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-crm-yellow" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideUp>

        {/* Communication tabs and content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Communication list */}
          <SlideUp delay={0.1} className="md:col-span-1">
            <Card className="border h-full flex flex-col">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center">
                <CardTitle className="text-base font-semibold">Communications</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4 text-crm-gray" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4 text-crm-gray" />
                  </Button>
                </div>
              </CardHeader>
              <div className="px-5 pb-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-crm-gray" />
                  <Input 
                    type="search" 
                    placeholder="Search communications..." 
                    className="pl-8 h-9"
                  />
                </div>
              </div>
              <div className="px-5 py-2">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid grid-cols-4 h-9 w-full">
                    <TabsTrigger value="emails" className="text-xs">Emails</TabsTrigger>
                    <TabsTrigger value="calls" className="text-xs">Calls</TabsTrigger>
                    <TabsTrigger value="meetings" className="text-xs">Meetings</TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
                  </TabsList>
                
                  <CardContent className="px-0 py-1 flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto subtle-scroll">
                      {isLoading ? (
                        <div className="p-5 space-y-4 animate-pulse">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded-md" />
                          ))}
                        </div>
                      ) : (
                        <div>
                          <TabsContent value="emails" className="m-0">
                            {emailCommunications.map((comm) => (
                              <button 
                                key={comm.id}
                                className="w-full text-left px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCommunicationColor(comm.type)}`}>
                                    {getCommunicationIcon(comm.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium text-crm-black truncate">{comm.subject}</p>
                                      {getStatusBadge(comm.status)}
                                    </div>
                                    <p className="text-sm text-crm-gray truncate mt-1">{comm.contact.name}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="h-3 w-3 text-crm-gray" />
                                      <p className="text-xs text-crm-gray">{comm.date}</p>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </TabsContent>
                          <TabsContent value="calls" className="m-0">
                            {callCommunications.map((comm) => (
                              <button 
                                key={comm.id}
                                className="w-full text-left px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCommunicationColor(comm.type)}`}>
                                    {getCommunicationIcon(comm.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium text-crm-black truncate">{comm.subject}</p>
                                      {getStatusBadge(comm.status)}
                                    </div>
                                    <p className="text-sm text-crm-gray truncate mt-1">{comm.contact.name}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="h-3 w-3 text-crm-gray" />
                                      <p className="text-xs text-crm-gray">{comm.date}</p>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </TabsContent>
                          <TabsContent value="meetings" className="m-0">
                            {meetingCommunications.map((comm) => (
                              <button 
                                key={comm.id}
                                className="w-full text-left px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCommunicationColor(comm.type)}`}>
                                    {getCommunicationIcon(comm.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium text-crm-black truncate">{comm.subject}</p>
                                      {getStatusBadge(comm.status)}
                                    </div>
                                    <p className="text-sm text-crm-gray truncate mt-1">{comm.contact.name}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="h-3 w-3 text-crm-gray" />
                                      <p className="text-xs text-crm-gray">{comm.date}</p>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </TabsContent>
                          <TabsContent value="notes" className="m-0">
                            {noteCommunications.map((comm) => (
                              <button 
                                key={comm.id}
                                className="w-full text-left px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCommunicationColor(comm.type)}`}>
                                    {getCommunicationIcon(comm.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium text-crm-black truncate">{comm.subject}</p>
                                      {getStatusBadge(comm.status)}
                                    </div>
                                    <p className="text-sm text-crm-gray truncate mt-1">{comm.contact.name}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Clock className="h-3 w-3 text-crm-gray" />
                                      <p className="text-xs text-crm-gray">{comm.date}</p>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </TabsContent>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Tabs>
              </div>
              <CardFooter className="px-5 py-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="w-full text-crm-blue">
                  View All <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </SlideUp>

          {/* Compose/View area */}
          <SlideUp delay={0.2} className="md:col-span-2">
            <Card className="border h-full flex flex-col">
              <CardHeader className="px-5 py-4 flex flex-row justify-between items-center border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-crm-light-blue flex items-center justify-center">
                    <Mail className="h-4 w-4 text-crm-blue" />
                  </div>
                  <CardTitle className="text-base font-semibold">New Message</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="template">
                    <SelectTrigger className="h-8 text-xs w-[140px]">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="template">No Template</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="meeting">Meeting Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-1 overflow-hidden flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 flex-shrink-0">
                      <p className="text-sm text-crm-dark-gray">To:</p>
                    </div>
                    <div className="flex-1">
                      <Input placeholder="Enter recipient email" className="h-9" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 flex-shrink-0">
                      <p className="text-sm text-crm-dark-gray">Cc/Bcc:</p>
                    </div>
                    <div className="flex-1">
                      <Input placeholder="Enter cc/bcc emails" className="h-9" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <div className="w-20 flex-shrink-0">
                      <p className="text-sm text-crm-dark-gray">Subject:</p>
                    </div>
                    <div className="flex-1">
                      <Input placeholder="Enter subject" className="h-9" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Textarea 
                      placeholder="Compose your message here..." 
                      className="h-full min-h-[200px] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-5 py-3 border-t border-gray-100 flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-1 h-3 w-3" /> Save Draft
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-1 h-3 w-3" /> Schedule
                  </Button>
                </div>
                <Button className="bg-crm-blue hover:bg-crm-blue/90">
                  <Send className="mr-1 h-3 w-3" /> Send Message
                </Button>
              </CardFooter>
            </Card>
          </SlideUp>
        </div>

        {/* Templates Section */}
        <SlideUp delay={0.3}>
          <Card className="border">
            <CardHeader className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-crm-purple" />
                  <CardTitle className="text-base font-semibold">Communication Templates</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-3 w-3" /> Create New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Welcome Email", type: "email", usage: 45 },
                  { name: "Follow-up Template", type: "email", usage: 78 },
                  { name: "Meeting Confirmation", type: "email", usage: 34 },
                  { name: "Discovery Call Script", type: "call", usage: 23 },
                  { name: "Demo Meeting Agenda", type: "meeting", usage: 19 },
                  { name: "Proposal Follow-up", type: "email", usage: 56 }
                ].map((template, index) => (
                  <Card key={index} className="border bg-gray-50 hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              template.type === "email" 
                                ? "bg-crm-light-blue text-crm-blue" 
                                : template.type === "call"
                                ? "bg-crm-light-green text-crm-green"
                                : "bg-crm-light-purple text-crm-purple"
                            }`}>
                              {template.type === "email" 
                                ? <Mail className="h-4 w-4" />
                                : template.type === "call"
                                ? <Phone className="h-4 w-4" />
                                : <Calendar className="h-4 w-4" />
                              }
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-crm-black">{template.name}</h4>
                              <p className="text-xs text-crm-gray mt-0.5 capitalize">{template.type} Template</p>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white text-crm-blue border-crm-blue/20">
                          Used {template.usage} times
                        </Badge>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </PageTransition>
  );
};

export default CommunicationCenter;
