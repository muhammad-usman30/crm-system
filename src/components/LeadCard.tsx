
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/animations";
import { Phone, Mail, Calendar, MoreHorizontal, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LeadCardProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed";
  nextAction?: string;
  nextActionDate?: string;
  score?: number;
  avatarUrl?: string;
  className?: string;
}

const LeadCard = ({
  name,
  email,
  phone,
  company,
  status,
  nextAction,
  nextActionDate,
  score,
  avatarUrl,
  className,
}: LeadCardProps) => {
  // Get status color and label
  const getStatusDetails = () => {
    switch (status) {
      case "new":
        return { color: "bg-crm-light-blue text-crm-blue", label: "New" };
      case "contacted":
        return { color: "bg-crm-light-yellow text-crm-yellow", label: "Contacted" };
      case "qualified":
        return { color: "bg-crm-light-purple text-crm-purple", label: "Qualified" };
      case "proposal":
        return { color: "bg-crm-light-green text-crm-green", label: "Proposal" };
      case "negotiation":
        return { color: "bg-yellow-100 text-yellow-800", label: "Negotiation" };
      case "closed":
        return { color: "bg-green-100 text-green-800", label: "Closed" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Unknown" };
    }
  };

  const statusDetails = getStatusDetails();
  
  // Get the initials from the name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <HoverCard>
      <Card className={cn("border overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div className="flex space-x-3">
              <Avatar className="h-10 w-10">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
                <AvatarFallback className="bg-crm-light-blue text-crm-blue">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-crm-black">{name}</h3>
                  {score !== undefined && (
                    <Badge variant="outline" className="bg-crm-light-purple/50 text-crm-purple border-crm-purple/20 text-xs">
                      {score}/10
                    </Badge>
                  )}
                </div>
                {company && <p className="text-sm text-crm-gray mt-0.5">{company}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Badge variant="outline" className={cn("text-xs font-normal", statusDetails.color)}>
                {statusDetails.label}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
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
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-crm-gray" />
              <span className="text-crm-gray">{email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-crm-gray" />
              <span className="text-crm-gray">{phone}</span>
            </div>
          </div>

          {(nextAction || nextActionDate) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-crm-gray" />
                <span className="text-sm font-medium text-crm-dark-gray">Next Action</span>
              </div>
              <div className="mt-1 text-sm text-crm-gray">
                {nextAction && <p>{nextAction}</p>}
                {nextActionDate && <p className="text-xs mt-1">{nextActionDate}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Phone className="h-3 w-3 mr-1" /> Call
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <Mail className="h-3 w-3 mr-1" /> Email
            </Button>
            <Button variant="default" size="sm" className="text-xs h-8 bg-crm-blue hover:bg-crm-blue/90">
              <User className="h-3 w-3 mr-1" /> View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
};

export default LeadCard;
