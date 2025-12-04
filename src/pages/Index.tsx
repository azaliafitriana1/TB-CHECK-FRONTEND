import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoPutihImage from "@/assets/logo putih aja.png";
import heroImage from "@/assets/8.png"; 
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  FileText, 
  Cpu, 
  ClipboardCheck, 
  AlertTriangle,
  Mail,
  Copyright
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  // Data Manfaat
  const benefits = [
    {
      icon: Zap,
      title: "Skrining Cepat",
      description: "Mempercepat proses skrining awal pasien dengan analisis citra instan."
    },
    {
      icon: Activity,
      title: "Akurasi Tinggi",
      description: "Didukung model AI dengan akurasi validasi mencapai 99.52%."
    },
    {
      icon: ShieldCheck,
      title: "Aman & Privat",
      description: "Keamanan data pasien terjamin dengan enkripsi standar medis."
    },
    {
      icon: Stethoscope,
      title: "Decision Support",
      description: "Alat bantu pendukung keputusan klinis bagi tenaga medis profesional."
    }
  ];

  // Data FAQ
  const faqs = [
    {
      q: "Apa dasar penilaian risiko ini?",
      a: "Sistem menggunakan model Deep Learning (InceptionV3) yang dilatih dengan 4.200 data citra rontgen dada TB dan Normal yang telah diverifikasi oleh radiolog."
    },
    {
      q: "Apakah data pasien saya disimpan?",
      a: "Data pasien dapat disimpan dengan format pdf."
    },
    {
      q: "Apakah aplikasi ini bisa dipakai oleh pasien?",
      a: "Tidak. Aplikasi ini dirancang khusus sebagai alat bantu bagi tenaga medis terlatih dan bukan untuk penggunaan mandiri oleh pasien awam."
    },
    {
      q: "Apa batasan dari sistem ini?",
      a: "Sistem ini adalah alat skrining, bukan alat diagnosis final. Hasil positif harus selalu dikonfirmasi dengan pemeriksaan lebih lanjut."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-background to-accent/20 font-sans">
      
      {/* --- HEADER SECTION --- */}
      <header 
        style={{backgroundColor: "#24A79A"}}
        className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Kiri */}
          <div className="flex items-center gap-3">
            <img 
              src={logoPutihImage} 
              alt="Logo TBCheck" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-primary text-white">TBCheck</h1>
              <p className="text-xs text-muted-foreground text-white/90">Deteksi TB AI</p>
            </div>
          </div>

          {/* Tombol Login & Signup (Kanan) */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/login")}
              className="text-white bg-transparent hover:bg-white hover:text-[#24A79A] transition-colors"
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
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Konten Teks */}
          <div className="space-y-6 text-left md:ml-20">
            <h1 
              style={{ color: "#24A79A" }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              TBCheck
            </h1>

            <p className="text-xl md:text-2xl font-medium text-foreground">
              Sistem Deteksi TB dari Citra Rontgen Berbasis AI
            </p>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Platform AI modern untuk membantu tenaga medis mendeteksi tuberkulosis 
              dari hasil rontgen dada dengan cepat, akurat, dan efisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 h-14 bg-[#24A79A] hover:bg-[#1d8f83]"
                onClick={() => navigate("/login")}
              >
                Mulai Sekarang
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 h-14 border-[#24A79A] text-[#24A79A] hover:bg-[#24A79A]/10"
                // 👇 UPDATE DI SINI: Kirim state isPublic
                onClick={() => navigate("/info-model", { state: { isPublic: true } })}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: Gambar Besar */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-[#24A79A]/20 blur-3xl rounded-full -z-10" />
            <img 
              src={heroImage} 
              alt="Ilustrasi Medis TBCheck" 
              className="w-[30rem] h-auto ml-auto -translate-x-20 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:drop-shadow-[0_0_10px_#24A79A]"
            />
          </div>
        </div>
      </div>

      {/* --- 2. KEY BENEFITS SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Menggunakan TBCheck?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dirancang khusus untuk mendukung efisiensi dan akurasi tenaga medis dalam menangani kasus Tuberkulosis.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gray-50/50">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#24A79A]/10 flex items-center justify-center text-[#24A79A]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. MEDICAL DISCLAIMER (PENTING) --- */}
      <section className="bg-amber-50 border-y border-amber-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-4xl mx-auto bg-white p-6 rounded-xl border border-amber-200 shadow-sm">
            <div className="p-3 bg-amber-100 rounded-full shrink-0">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Disclaimer Medis Penting</h3>
              <p className="text-amber-900/80 text-sm leading-relaxed">
                Aplikasi ini <strong>tidak menggantikan diagnosa medis profesional</strong>. Hasil penilaian risiko AI 
                hanya bersifat pendukung (screening) dan <strong>wajib dikonfirmasi</strong> dengan pemeriksaan klinis 
                lebih lanjut. Hanya untuk penggunaan oleh tenaga medis terlatih.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. HOW IT WORKS --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Cara Kerja Sistem</h2>
            <p className="text-muted-foreground mt-2">Alur kerja sederhana untuk efisiensi diagnosis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <FileText className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Input Data Klinis</h3>
              <p className="text-sm text-muted-foreground">Upload citra rontgen dada dan lengkapi data gejala pasien.</p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-[#24A79A]/20 text-[#24A79A] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <Cpu className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Analisis AI</h3>
              <p className="text-sm text-muted-foreground">Sistem memproses citra menggunakan model Deep Learning.</p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <ClipboardCheck className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Hasil Penilaian</h3>
              <p className="text-sm text-muted-foreground">Dapatkan probabilitas risiko dan visualisasi area infeksi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. FAQ --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Pertanyaan Umum (FAQ)</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:border-[#24A79A]/50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 py-5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 border-b border-slate-800 pb-8 mb-8">
            
            {/* Kolom 1: Logo + Deskripsi */}
            <div className="space-y-4 max-w-sm ml-10 py-3">
              <div className="flex items-center gap-3">
                <img 
                  src={logoPutihImage} 
                  alt="Logo TBCheck" 
                  className="w-10 h-10 object-contain rounded-xl"
                />
                <span className="font-bold text-white text-xl">TBCheck</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Solusi teknologi kesehatan untuk mendukung eliminasi Tuberkulosis di Indonesia melalui deteksi dini berbasis kecerdasan buatan.
              </p>
            </div>

            {/* Kolom 2: Tautan */}
            <div className="space-y-4 max-w-sm justify-self-center py-3">
              <h4 className="font-bold text-white">Tautan</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => navigate("/login")} 
                    className="hover:text-[#24A79A] transition-colors"
                  >
                    Masuk Akun
                  </button>
                </li>
                <li>
                  <button 
                    // 👇 UPDATE DI SINI JUGA: Kirim state isPublic
                    onClick={() => navigate("/info-model", { state: { isPublic: true } })} 
                    className="hover:text-[#24A79A] transition-colors"
                  >
                    Tentang Model AI
                  </button>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Hubungi Kami */}
            <div className="space-y-4 max-w-sm justify-self-end mr-10 py-3">
              <h4 className="font-bold text-white">Hubungi Kami</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="hover:text-[#24A79A] transition-colors">
                    tbcheck.support@gmail.com
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#24A79A] transition-colors">
                    +62 812-3456-7890
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex justify-center items-center text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Copyright className="w-3 h-3" />
              <span>2025 Applied Data Science PENS. All rights reserved.</span>
            </div>
          </div>

        </div>
      </footer>

    </div> 
  );
};

export default Index;