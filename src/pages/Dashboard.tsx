import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Upload, 
  MessageSquare, 
  Info, 
  User, 
  Calendar, 
  Clock, 
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy Data Aktivitas (Dibuat banyak agar bisa di-scroll)
  const recentActivities = [
    { id: 1, patient: "Budi Santoso", age: "35 tahun", time: "Baru saja", status: "Positif" },
    { id: 2, patient: "Siti Aminah", age: "40 tahun", time: "15 menit lalu", status: "Negatif" },
    { id: 3, patient: "Ahmad Dani", age: "35 tahun", time: "1 jam lalu", status: "Negatif" },
    { id: 4, patient: "Dewi Sartika", age: "35 tahun", time: "2 jam lalu", status: "Negatif" },
    { id: 5, patient: "Eko Purnomo", age: "40 tahun", time: "3 jam lalu", status: "Negatif" },
    { id: 6, patient: "Fajar Nugraha", age: "35 tahun", time: "Kemarin", status: "Positif" },
    { id: 7, patient: "Rina Wati", age: "35 tahun", time: "Kemarin", status: "Negatif" },
  ];

  const stats = [
    { 
      label: "Total Pasien", 
      value: "127", 
      icon: User, 
      color: "text-blue-500", 
      bg: "bg-blue-100" 
    },
    { 
      label: "TB Terdeteksi", 
      value: "23", 
      icon: Activity, 
      color: "text-red-500", 
      bg: "bg-red-100" 
    },
    { 
      // 👇 REVISI: Diganti jadi Pasien Hari Ini
      label: "Pasien Hari Ini", 
      value: "12", 
      icon: Calendar, 
      color: "text-orange-500", 
      bg: "bg-orange-100" 
    },
  ];

  const quickActions = [
    {
      title: "Mulai Analisis Baru",
      desc: "Upload citra rontgen untuk deteksi dini TB",
      icon: Upload,
      path: "/analisis",
      btnText: "Upload Sekarang",
      primary: true // Paling menonjol
    },
    {
      title: "Tanya Asisten AI",
      desc: "Konsultasi cepat seputar informasi medis TB",
      icon: MessageSquare,
      path: "/chatbot",
      btnText: "Chat Bot",
      primary: false
    },
    {
      // 👇 REVISI: Mengganti 'Riwayat' jadi 'Info Model' biar tidak redundan
      title: "Tentang Model AI", 
      desc: "Cek spesifikasi dan performa InceptionV3",
      icon: Info,
      path: "/info-model",
      btnText: "Cek Model",
      primary: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        
        {/* 1. Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Selamat datang!</h1>
          </div>
          <p className="text-sm text-muted-foreground px-3 py-1">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* 2. Stats Row */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          
          {/* 3. Kolom Kiri: Quick Actions (Menu Utama) */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Akses Cepat</h2>
            <div className="grid gap-4">
              {quickActions.map((action) => (
                <Card 
                  key={action.title} 
                  className={`cursor-pointer transition-all hover:shadow-md group border-l-4 border-l-[#24A79A]`}
                  onClick={() => navigate(action.path)}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${action.primary ? 'bg-[#24A79A]/10 text-[#24A79A]' : 'bg-gray-100 text-gray-600'}`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 group-hover:text-[#24A79A] transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{action.desc}</p>
                      </div>
                    </div>
                    <Button 
                      variant={action.primary ? "default" : "ghost"} 
                      className={action.primary ? "bg-[#24A79A] hover:bg-[#1d8f83]" : ""}
                    >
                      {action.primary ? action.btnText : <ArrowRight className="w-5 h-5 text-gray-400" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 4. Kolom Kanan: Recent Activity (Scrollable) */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Aktivitas Terkini</h2>
            
            {/* 👇 Set tinggi fix agar sejajar dengan kolom kiri */}
            <Card className="h-[450px] border-none shadow-sm bg-gray-50/50 flex flex-col">
              
              {/* Wrapper konten flex column agar footer bisa sticky di bawah */}
              <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                
                {/* Area Scrollable */}
                <div className="flex-1 overflow-y-auto p-0">
                  <div className="divide-y divide-gray-100">
                    {recentActivities.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-white transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-sm text-gray-700">{item.patient}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            item.status === 'Positif' ? 'bg-red-100 text-red-600' : 
                            item.status === 'Negatif' ? 'bg-green-100 text-green-600' : 
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Activity className="w-3 h-3" /> {item.age}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer (Sticky di bawah, tidak ikut scroll) */}
                <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs text-gray-500 hover:text-[#24A79A] hover:bg-[#24A79A]/5" 
                    onClick={() => navigate('/riwayat')}
                  >
                    Lihat Semua Riwayat →
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;