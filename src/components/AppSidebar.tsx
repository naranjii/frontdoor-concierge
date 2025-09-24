import { useState } from "react";
import { FileText, Users, UserPlus, BarChart3, Settings, DollarSign, Calendar, Activity, Shield, Building2, UserCheck, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  route: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userPermissions: string[]; // Array of permission names like ['admin', 'finance', 'coordination']
  currentUser: {
    name: string;
    role: string;
  };
}

// Define all available menu sections
const allMenuSections: Record<string, MenuSection> = {
  administration: {
    title: "Administration",
    items: [
      { id: "staff", title: "Staff Management", icon: Users, route: "/admin" },
      { id: "permissions", title: "Permissions", icon: Shield, route: "/admin/permissions" },
      { id: "settings", title: "System Settings", icon: Settings, route: "/admin/settings" },
    ]
  },
  finance: {
    title: "Finance",
    items: [
      { id: "finance-overview", title: "Overview", icon: BarChart3, route: "/finance" },
      { id: "invoices", title: "Invoices", icon: FileText, route: "/finance/invoices" },
      { id: "expenses", title: "Expenses", icon: DollarSign, route: "/finance/expenses" },
    ]
  },
  coordination: {
    title: "Coordination",
    items: [
      { id: "scheduling", title: "Scheduling", icon: Calendar, route: "/coordinator" },
      { id: "therapist-workload", title: "Therapist Workload", icon: Activity, route: "/coordinator/workload" },
      { id: "queue", title: "Reception Queue", icon: UserCheck, route: "/coordinator/queue" },
    ]
  },
  reception: {
    title: "Reception",
    items: [
      { id: "logbook", title: "Logbook", icon: FileText, route: "/receptionist" },
      { id: "registrations", title: "Registrations", icon: UserPlus, route: "/receptionist/registrations" },
      { id: "checkin", title: "Check-in", icon: UserCheck, route: "/receptionist/checkin" },
    ]
  },
  therapy: {
    title: "Therapy",
    items: [
      { id: "appointments", title: "My Appointments", icon: Calendar, route: "/therapist" },
      { id: "patients", title: "My Patients", icon: Users, route: "/therapist/patients" },
      { id: "notes", title: "Session Notes", icon: FileText, route: "/therapist/notes" },
    ]
  }
};

// Permission mapping
const permissionSectionMap: Record<string, string> = {
  'admin': 'administration',
  'finance': 'finance',
  'coordination': 'coordination',
  'reception': 'reception',
  'therapy': 'therapy'
};

export function AppSidebar({ activeView, setActiveView, userPermissions, currentUser }: AppSidebarProps) {
  // Filter sections based on user permissions
  const availableSections = userPermissions
    .map(permission => permissionSectionMap[permission])
    .filter(Boolean)
    .map(sectionKey => allMenuSections[sectionKey])
    .filter(Boolean);

  // State to manage which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    availableSections.reduce((acc, section) => {
      // Check if any item in this section is currently active
      const hasActiveItem = section.items.some(item => item.id === activeView);
      acc[section.title] = hasActiveItem; // Keep section open if it has active item
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleNavigation = (route: string, id: string) => {
    setActiveView(id);
    // In a real app, you'd use router.navigate(route) here
  };

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  return (
    <Sidebar className="border-r bg-card shadow-soft">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-foreground">OTWare</h2>
            <p className="text-xs text-muted-foreground">Healthcare Portal</p>
          </div>
        </div>
        
        {/* User Badge */}
        <div className="mt-4 p-3 bg-gradient-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-accent-foreground">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
              <Badge variant="secondary" className="text-xs">{currentUser.role}</Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {availableSections.map((section) => (
          <Collapsible 
            key={section.title}
            open={openSections[section.title]}
            onOpenChange={() => toggleSection(section.title)}
          >
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-muted-foreground font-medium mb-2 cursor-pointer hover:text-foreground transition-smooth flex items-center justify-between w-full py-2 px-2 rounded-md hover:bg-accent/10">
                  <span>{section.title}</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openSections[section.title] ? 'rotate-180' : ''
                    }`} 
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1">
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => handleNavigation(item.route, item.id)}
                          isActive={activeView === item.id}
                          className="transition-smooth hover:bg-accent/10 hover:text-accent data-[active=true]:bg-gradient-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-soft"
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}