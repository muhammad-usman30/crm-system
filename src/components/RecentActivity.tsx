
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Phone, FileCheck, MessageSquare, ChevronRight } from "lucide-react";

interface ActivityItem {
  id: number;
  type: "email" | "call" | "meeting" | "task" | "note" | "status";
  user: {
    name: string;
    avatar?: string;
  };
  target?: {
    name: string;
    type: "lead" | "customer" | "deal";
  };
  description: string;
  time: string;
  isNew?: boolean;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  className?: string;
}

const RecentActivity = ({ activities, className }: RecentActivityProps) => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "task":
        return <FileCheck className="h-4 w-4" />;
      case "note":
        return <MessageSquare className="h-4 w-4" />;
      case "status":
        return <User className="h-4 w-4" />;
    }
  };

  const getActivityIconColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "email":
        return "bg-crm-light-blue text-crm-blue";
      case "call":
        return "bg-crm-light-green text-crm-green";
      case "meeting":
        return "bg-crm-light-purple text-crm-purple";
      case "task":
        return "bg-crm-light-yellow text-crm-yellow";
      case "note":
        return "bg-gray-100 text-gray-600";
      case "status":
        return "bg-crm-light-red text-crm-red";
    }
  };

  return (
    <Card className={cn("border h-full", className)}>
      <CardHeader className="py-4 px-5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-crm-blue">
            View All <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto subtle-scroll">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex space-x-3 px-5 py-3 border-t border-gray-100 transition-colors",
                activity.isNew && "bg-gray-50"
              )}
            >
              <div className="flex flex-col items-center">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getActivityIconColor(activity.type))}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="w-0.5 h-full bg-gray-100 mt-2" />
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-2">
                    <Avatar className="h-6 w-6">
                      {activity.user.avatar ? (
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      ) : null}
                      <AvatarFallback className="text-xs bg-crm-light-blue text-crm-blue">
                        {activity.user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-crm-black">
                        <span className="font-medium">{activity.user.name}</span>
                        {activity.target && (
                          <>
                            {" "}
                            <span className="text-crm-gray">with</span>{" "}
                            <span className="font-medium">{activity.target.name}</span>
                          </>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-crm-gray">{activity.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-crm-gray">{activity.time}</span>
                    {activity.isNew && (
                      <Badge variant="outline" className="mt-1 text-xs bg-crm-light-blue text-crm-blue border-crm-blue/20">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
