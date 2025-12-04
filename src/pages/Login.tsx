import { useState, useEffect } from "react";
// 👇 Tambahkan useLocation di sini
import { useNavigate, useLocation } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logoImage from "@/assets/logo aja.png";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Ambil data lokasi

  // 👇 Logika Cerdas: 
  // Cek apakah ada titipan pesan 'mode: signup'. 
  // Kalau ada, set isSignup jadi true. Kalau tidak, default false (login).
  const [isSignup, setIsSignup] = useState(location.state?.mode === "signup");
  
  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup states
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [institution, setInstitution] = useState("");
  const [phone, setPhone] = useState("");

  // ... (Sisa kode handleLogin dan handleSignup ke bawah SAMA PERSIS, tidak ada yang diubah) ...
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Login berhasil!");
      navigate("/dashboard");
    } else {
      toast.error("Mohon isi email dan password");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && signupEmail && signupPassword && profession && licenseNumber && institution) {
      toast.success("Registrasi berhasil! Silakan login.");
      setIsSignup(false);
      // Reset signup form
      setFullName("");
      setSignupEmail("");
      setSignupPassword("");
      setProfession("");
      setLicenseNumber("");
      setInstitution("");
      setPhone("");
    } else {
      toast.error("Mohon isi semua field yang wajib");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/20 via-background to-accent/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center">
            <img 
              src={logoImage}   // atau logoPutihImage sesuai kebutuhan
              alt="Logo TBCheck" 
              className="w-12 h-auto object-contain" 
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-primary">TBCheck</CardTitle>
            <CardDescription className="text-base mt-2">
              Sistem Deteksi TB dari Citra Rontgen
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {!isSignup ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dokter@tbcheck.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium">
                Masuk
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Daftar sekarang
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Dr. Ahmad Saputra"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="dokter@tbcheck.id"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession">Profesi</Label>
                <Select value={profession} onValueChange={setProfession}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Pilih profesi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dokter-umum">Dokter Umum</SelectItem>
                    <SelectItem value="dokter-spesialis-paru">Dokter Spesialis Paru</SelectItem>
                    <SelectItem value="radiolog">Radiolog</SelectItem>
                    <SelectItem value="perawat">Perawat</SelectItem>
                    <SelectItem value="analis-lab">Analis Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Nomor STR/SIP</Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  placeholder="1234567890123456"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Instansi/Fasilitas Medis</Label>
                <Input
                  id="institution"
                  type="text"
                  placeholder="RS. Umum Jakarta"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon (opsional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium">
                Daftar
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Masuk di sini
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;