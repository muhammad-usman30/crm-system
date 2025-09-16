
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Menu, Search, X } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const routes = [
    { name: 'Dashboard', path: '/' },
    { name: 'Leads', path: '/leads' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Users', path: '/users' },
    { name: 'Communications', path: '/communications' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-crm-blue to-crm-purple flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="text-crm-black font-semibold text-lg hidden sm:inline-block">CRM System</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              to={route.path} 
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === route.path
                  ? "text-crm-blue bg-crm-light-blue"
                  : "text-crm-dark-gray hover:text-crm-blue hover:bg-crm-light-blue/50"
              )}
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {isSearchOpen ? (
            <div className="relative animate-fade-in">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-8 h-9 focus-visible:ring-crm-blue"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-crm-gray" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1.5 h-6 w-6" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-crm-gray hover:text-crm-blue hover:bg-crm-light-blue/50"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-crm-gray hover:text-crm-blue hover:bg-crm-light-blue/50"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-crm-red text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto subtle-scroll">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="py-3 cursor-pointer">
                    <div className="flex space-x-3">
                      <div className={cn(
                        "w-2 h-2 mt-1.5 rounded-full",
                        i === 1 ? "bg-crm-red" : "bg-crm-blue"
                      )} />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{i === 1 ? "New lead assigned" : "Meeting reminder"}</p>
                        <p className="text-xs text-crm-gray">
                          {i === 1 
                            ? "A new lead has been assigned to you" 
                            : `Client meeting in ${i} hours`}
                        </p>
                        <p className="text-xs text-crm-gray">{i * 10} minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2 cursor-pointer justify-center text-sm text-crm-blue">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 overflow-hidden ml-1">
                <Avatar className="h-full w-full">
                  <AvatarImage src="https://i.pravatar.cc/300" />
                  <AvatarFallback className="bg-crm-light-blue text-crm-blue">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-crm-gray">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-crm-red">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-crm-gray hover:text-crm-blue hover:bg-crm-light-blue/50"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-crm-gray hover:text-crm-blue hover:bg-crm-light-blue/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile search */}
      {isSearchOpen && isMobile && (
        <div className="px-4 py-2 bg-white border-t border-gray-100 animate-slide-up">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 focus-visible:ring-crm-blue"
              autoFocus
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up shadow-md">
          <div className="px-4 py-3 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "block px-3 py-2 rounded-md font-medium transition-colors",
                  location.pathname === route.path
                    ? "text-crm-blue bg-crm-light-blue"
                    : "text-gray-700 hover:text-crm-blue hover:bg-crm-light-blue/50"
                )}
              >
                {route.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/300" />
                  <AvatarFallback className="bg-crm-light-blue text-crm-blue">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-crm-gray">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
