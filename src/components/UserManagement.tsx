
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  UserPlus, 
  UserMinus, 
  Filter,
  Key,
  ShieldCheck,
  Award,
  ClipboardList
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "sales" | "support";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  avatar?: string;
  performance?: {
    leads: number;
    deals: number;
    conversion: number;
  };
}

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample user data
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      status: "active",
      lastLogin: "Today, 9:42 AM",
      avatar: "https://i.pravatar.cc/150?img=1",
      performance: {
        leads: 45,
        deals: 12,
        conversion: 26.7,
      },
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@example.com",
      role: "manager",
      status: "active",
      lastLogin: "Today, 8:15 AM",
      avatar: "https://i.pravatar.cc/150?img=5",
      performance: {
        leads: 62,
        deals: 18,
        conversion: 29.0,
      },
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "sales",
      status: "active",
      lastLogin: "Yesterday, 5:30 PM",
      avatar: "https://i.pravatar.cc/150?img=8",
      performance: {
        leads: 38,
        deals: 9,
        conversion: 23.7,
      },
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "sales",
      status: "active",
      lastLogin: "Yesterday, 3:22 PM",
      avatar: "https://i.pravatar.cc/150?img=9",
      performance: {
        leads: 51,
        deals: 15,
        conversion: 29.4,
      },
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "support",
      status: "inactive",
      lastLogin: "Jun 20, 2023, 10:15 AM",
      performance: {
        leads: 0,
        deals: 0,
        conversion: 0,
      },
    },
    {
      id: 6,
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      role: "sales",
      status: "pending",
      lastLogin: "Never",
      performance: {
        leads: 0,
        deals: 0,
        conversion: 0,
      },
    },
  ];

  // Get status badge
  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-crm-light-green text-crm-green border-none">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-600 border-none">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-crm-light-yellow text-crm-yellow border-none">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Get role badge
  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-crm-light-red text-crm-red border-none">Admin</Badge>;
      case "manager":
        return <Badge className="bg-crm-light-purple text-crm-purple border-none">Manager</Badge>;
      case "sales":
        return <Badge className="bg-crm-light-blue text-crm-blue border-none">Sales</Badge>;
      case "support":
        return <Badge className="bg-gray-100 text-gray-600 border-none">Support</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-crm-black">User Management</h1>
            <p className="text-crm-gray mt-1">Manage system users and permissions</p>
          </div>
          <Button className="bg-crm-blue hover:bg-crm-blue/90">
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>

        {/* Summary cards */}
        <SlideUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Total Users</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">{users.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-blue flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-crm-blue" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Active Users</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {users.filter(u => u.status === "active").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-green flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-crm-green" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Admins</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {users.filter(u => u.role === "admin").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-red flex items-center justify-center">
                  <Key className="h-5 w-5 text-crm-red" />
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-crm-gray">Sales Users</p>
                  <p className="text-2xl font-semibold text-crm-black mt-1">
                    {users.filter(u => u.role === "sales").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-crm-light-purple flex items-center justify-center">
                  <Award className="h-5 w-5 text-crm-purple" />
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideUp>

        {/* User table */}
        <SlideUp delay={0.1}>
          <Card className="border">
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-base font-semibold">Users</CardTitle>
            </CardHeader>

            <div className="px-6 pb-1">
              <Tabs defaultValue="all">
                <TabsList className="h-9">
                  <TabsTrigger value="all" className="text-xs">All Users</TabsTrigger>
                  <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                  <TabsTrigger value="inactive" className="text-xs">Inactive</TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <CardContent className="px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-crm-gray" />
                  <Input 
                    type="search" 
                    placeholder="Search users..." 
                    className="pl-8 h-9 w-full"
                  />
                </div>
                
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="h-9 text-xs">
                    <Filter className="mr-1 h-3 w-3" /> Filter
                  </Button>
                  <Select defaultValue="role">
                    <SelectTrigger className="h-9 text-xs w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="role">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="bg-crm-blue hover:bg-crm-blue/90 h-9 text-xs">
                    <Plus className="mr-1 h-3 w-3" /> Add User
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-crm-gray">{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                {user.avatar ? (
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                ) : null}
                                <AvatarFallback className="bg-crm-light-blue text-crm-blue">
                                  {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                {user.status === "active" ? (
                                  <DropdownMenuItem className="text-yellow-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-crm-green">Activate</DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-crm-red">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </SlideUp>

        {/* Top Performers */}
        <SlideUp delay={0.2}>
          <Card className="border">
            <CardHeader className="px-6 py-4">
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4 text-crm-yellow" />
                <CardTitle className="text-base font-semibold">Top Performers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {users
                  .filter(user => user.performance && user.performance.conversion > 0)
                  .sort((a, b) => (b.performance?.conversion || 0) - (a.performance?.conversion || 0))
                  .slice(0, 3)
                  .map((user, index) => (
                    <Card key={user.id} className="bg-gradient-to-br from-white to-gray-50 border overflow-hidden">
                      <CardContent className="p-5">
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-white/90 text-crm-blue border-none font-semibold shadow-sm">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-16 w-16 mb-3">
                            {user.avatar ? (
                              <AvatarImage src={user.avatar} alt={user.name} />
                            ) : null}
                            <AvatarFallback className="bg-crm-light-blue text-crm-blue text-lg">
                              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-crm-black mb-1">{user.name}</h3>
                          <p className="text-sm text-crm-gray mb-4">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                          
                          <div className="w-full grid grid-cols-3 gap-2 text-center">
                            <div className="bg-gray-50 rounded-md p-2">
                              <p className="text-xs text-crm-gray">Leads</p>
                              <p className="text-sm font-semibold text-crm-black">{user.performance?.leads}</p>
                            </div>
                            <div className="bg-gray-50 rounded-md p-2">
                              <p className="text-xs text-crm-gray">Deals</p>
                              <p className="text-sm font-semibold text-crm-black">{user.performance?.deals}</p>
                            </div>
                            <div className="bg-gray-50 rounded-md p-2">
                              <p className="text-xs text-crm-gray">Conv.</p>
                              <p className="text-sm font-semibold text-crm-black">{user.performance?.conversion}%</p>
                            </div>
                          </div>
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

export default UserManagement;
