import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, User, Search, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft } from "lucide-react";

const Riwayat = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data (Ditambah field 'age')
  const examinations = [
    {
      id: "1",
      patientName: "Ahmad Santoso",
      age: 45, // Tambah Usia
      date: "2024-01-15",
      result: "Positif TB",
      confidence: 87,
      status: "positive" as const,
    },
    {
      id: "2",
      patientName: "Siti Nurhaliza",
      age: 32,
      date: "2024-01-14",
      result: "Negatif TB",
      confidence: 94,
      status: "negative" as const,
    },
    {
      id: "3",
      patientName: "Budi Wijaya",
      age: 58,
      date: "2024-01-14",
      result: "Positif TB",
      confidence: 78,
      status: "positive" as const,
    },
    {
      id: "4",
      patientName: "Dewi Lestari",
      age: 29,
      date: "2024-01-13",
      result: "Negatif TB",
      confidence: 91,
      status: "negative" as const,
    },
    {
      id: "5",
      patientName: "Eko Prasetyo",
      age: 41,
      date: "2024-01-13",
      result: "Positif TB",
      confidence: 82,
      status: "positive" as const,
    },
    // Tambah data dummy biar scrollnya kelihatan
    { id: "6", patientName: "Rina Wati", age: 35, date: "2024-01-12", result: "Negatif TB", confidence: 98, status: "negative" as const },
    { id: "7", patientName: "Fajar Nugraha", age: 50, date: "2024-01-12", result: "Positif TB", confidence: 89, status: "positive" as const },
    { id: "8", patientName: "Gilang Ramadhan", age: 24, date: "2024-01-11", result: "Negatif TB", confidence: 95, status: "negative" as const },
  ];

  // Logika Search Filter
  const filteredExaminations = examinations.filter((exam) =>
    exam.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Pemeriksaan", value: examinations.length, icon: User },
    { label: "TB Terdeteksi", value: examinations.filter(e => e.status === "positive").length, icon: Calendar },
  ];

    return (
        <DashboardLayout>
          <div className="max-w-6xl mx-auto space-y-6 pb-10">
            
            {/* Header dengan Layout Rapi */}
            <div className="relative flex items-center justify-center py-4">
              {/* Tombol Kembali (Absolute di Kiri) */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")} // 👈 Ganti ke /dashboard
                className="absolute left-0 gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" /> 
                Kembali
              </Button>

              {/* Judul (Tetap di Tengah) */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">Riwayat Pemeriksaan</h1>
                <p className="text-muted-foreground mt-1">Kelola dan cari data pemeriksaan pasien</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

        {/* Table Card */}
        <Card className="flex flex-col h-[600px]"> {/* Set tinggi fix untuk Card */}
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle>Daftar Pasien</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Total {filteredExaminations.length} data ditemukan</p>
              </div>
              
              {/* Fitur Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Cari nama pasien..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          
          {/* Area Tabel Scrollable */}
          <CardContent className="p-0 flex-1 overflow-hidden"> {/* overflow-hidden di parent */}
            <div className="h-full overflow-y-auto"> {/* overflow-y-auto di wrapper tabel */}
              <Table>
                {/* Header Sticky biar nggak ilang pas discroll */}
                <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                  <TableRow>
                    <TableHead>Nama Pasien</TableHead>
                    <TableHead>Usia</TableHead> {/* Kolom Baru */}
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Hasil AI</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="text-right pr-6">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExaminations.length > 0 ? (
                    filteredExaminations.map((exam) => (
                      <TableRow key={exam.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                              {exam.patientName.charAt(0)}
                            </div>
                            {exam.patientName}
                          </div>
                        </TableCell>
                        <TableCell>{exam.age} Thn</TableCell>
                        <TableCell>{new Date(exam.date).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>
                          <Badge
                            variant={exam.status === "positive" ? "destructive" : "outline"}
                            className={exam.status === "negative" ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" : ""}
                          >
                            {exam.result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${exam.status === "positive" ? "bg-red-500" : "bg-green-500"}`} 
                                style={{ width: `${exam.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">{exam.confidence}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/detail/${exam.id}`)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="sr-only">Detail</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="w-8 h-8 mb-2 opacity-20" />
                          <p>Data tidak ditemukan.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Riwayat;