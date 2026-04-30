import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, ArrowLeft, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "User Directory", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-card/50 backdrop-blur-xl hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-2 font-serif text-xl font-bold">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Nivarana CRM
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "opacity-70"}`} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground border-gray-200 dark:border-gray-800">
              <ArrowLeft className="w-4 h-4" />
              Back to App
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <header className="h-16 sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center md:hidden gap-2 font-serif font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-primary" />
            CRM
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <a href="/api/logout">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </a>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
