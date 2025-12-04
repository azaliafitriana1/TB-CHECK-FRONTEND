import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Upload, History, MessageSquare, Info, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import logoPutihImage from "@/assets/logo putih aja.png";

interface DashboardLayoutProps {
  children: ReactNode;
  isPublic?: boolean; // 👈 Prop baru untuk mode publik
}

const DashboardLayout = ({ children, isPublic = false }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Upload, label: "Analisis", path: "/analisis" },
    { icon: History, label: "Riwayat", path: "/riwayat" },
    // { icon: MessageSquare, label: "Chatbot", path: "/chatbot" },
    { icon: Info, label: "Info Model", path: "/info-model" },
  ];

  const handleLogout = () => {
    toast.success("Logout berhasil");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-background to-accent/20">
      
      {/* Header */}
      <header
        style={{backgroundColor: "#24A79A"}} 
        className="bg-card border-b border-border sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            // 👇 Logika klik logo: Kalau public ke Home, kalau login ke Dashboard
            onClick={() => navigate(isPublic ? "/" : "/dashboard")}
          >
            <img 
              src={logoPutihImage} 
              alt="Logo TBCheck" 
              className="w-10 h-10 object-contain rounded-xl"
            />
            <div>
              <h1 className="text-xl font-bold text-primary text-white">TBCheck</h1>
              <p className="text-xs text-muted-foreground text-white">Deteksi TB AI</p>
            </div>
          </div>

          {/* Right Section (Tombol Login/Logout) */}
          <div>
            {isPublic ? (
              // 👇 Tampilan Mode Public (Masuk & Daftar)
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate("/login")}
                  className="text-white hover:text-white hover:bg-white/20 transition-colors"
                >
                  Masuk
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/login", { state: { mode: "signup" } })}
                  className="bg-white text-[#24A79A] hover:bg-white/90"
                >
                  Daftar
                </Button>
              </div>
            ) : (
              // 👇 Tampilan Mode Dashboard (Logout)
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="gap-2 text-white hover:text-[#24A79A] transition-colors group"
              >
                <LogOut className="w-4 h-4 text-white transition-colors group-hover:text-[#24A79A]" />
                Keluar
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation (Hanya muncul jika BUKAN mode public) */}
      {!isPublic && (
        <nav className="bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "gap-2 whitespace-nowrap",
                    location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;