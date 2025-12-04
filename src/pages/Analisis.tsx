import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileImage, AlertCircle, CheckCircle2, Save, User, Plus, X, Info, Stethoscope, Microscope, ScanEye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analisis = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analyzed, setAnalyzed] = useState(false);
  const [processing, setProcessing] = useState(false);

  // 👇 UPDATE STATE: Tambah 'ageUnit' default "Tahun"
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    ageUnit: "Tahun", 
    gender: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [symptomInput, setSymptomInput] = useState("");
  const [symptomsList, setSymptomsList] = useState<string[]>([]);

  const results = {
    prediction: "TB Terdeteksi",
    confidence: 87,
    status: "positive" as const,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalyzed(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const addSymptom = () => {
    if (!symptomInput.trim()) return;
    setSymptomsList([...symptomsList, symptomInput.trim()]);
    setSymptomInput("");
  };

  const removeSymptom = (index: number) => {
    const newList = symptomsList.filter((_, i) => i !== index);
    setSymptomsList(newList);
  };

  const handleAnalyze = () => {
    if (!patientData.name || !patientData.age || !file) {
      toast.error("Mohon lengkapi data pasien dan upload file rontgen");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setAnalyzed(true);
      toast.success("Analisis selesai!");
    }, 2000);
  };

  const handleSave = () => {
    toast.success("Hasil disimpan ke riwayat");
  };

// Jangan lupa import: import { ArrowLeft } from "lucide-react";

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
        
        {/* Header dengan Tombol Kembali */}
        <div className="relative flex items-center justify-center py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")} 
            className="absolute left-0 gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Analisis Rontgen</h1>
            <p className="text-muted-foreground mt-1">Lengkapi data pasien dan upload citra rontgen dada</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* --- KOLOM KIRI (Input Data) --- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Form Informasi Pasien */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Informasi Pasien
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Grid Nama & Usia */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                        <Label>Nama Pasien</Label>
                        <Input 
                            placeholder="Nama lengkap..."
                            value={patientData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                    </div>
                    
                    {/* 👇 UPDATE UI: Input Usia + Satuan */}
                    <div className="space-y-2">
                        <Label>Usia</Label>
                        <div className="flex gap-2">
                            <Input 
                                type="number" 
                                placeholder="0"
                                className="w-16 px-2" 
                                value={patientData.age}
                                onChange={(e) => handleInputChange("age", e.target.value)}
                            />
                            <Select 
                                value={patientData.ageUnit} 
                                onValueChange={(val) => handleInputChange("ageUnit", val)}
                            >
                                <SelectTrigger className="flex-1 px-2 min-w-[70px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tahun">Thn</SelectItem>
                                    <SelectItem value="Bulan">Bln</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Jenis Kelamin</Label>
                        <Select 
                            value={patientData.gender} 
                            onValueChange={(val) => handleInputChange("gender", val)}
                        >
                            <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="L">Laki-laki</SelectItem>
                                <SelectItem value="P">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Input 
                            type="date"
                            value={patientData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Keluhan / Gejala</Label>
                    <div className="flex gap-2">
                        <Input 
                            value={symptomInput}
                            onChange={(e) => setSymptomInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                            placeholder="Ketik gejala & enter..."
                        />
                        <Button type="button" size="icon" onClick={addSymptom} variant="outline">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-3 bg-muted/30 rounded-lg border border-dashed">
                        {symptomsList.length > 0 ? (
                            symptomsList.map((symptom, index) => (
                                <div key={index} className="bg-white border text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm animate-in fade-in zoom-in duration-200">
                                    {symptom}
                                    <button 
                                        onClick={() => removeSymptom(index)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground italic self-center">Belum ada gejala input.</p>
                        )}
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Citra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>

                {preview ? (
                  analyzed ? (
                    <div className="bg-muted/30 border border-border rounded-lg p-4 flex items-center gap-3 animate-in fade-in">
                      <div className="p-2 bg-green-100 text-green-600 rounded-full">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{file?.name}</p>
                        <p className="text-xs text-muted-foreground">Gambar telah diproses</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => {
                          setAnalyzed(false);
                          setFile(null);
                          setPreview("");
                        }}
                      >
                        Ganti
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/30 flex flex-col items-center gap-2 animate-in zoom-in-95">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-64 object-contain rounded shadow-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-2">{file?.name}</p>
                    </div>
                  )
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-10 text-center bg-muted/10 hover:bg-muted/20 transition-colors">
                    <FileImage className="w-12 h-12 mx-auto text-muted-foreground mb-2 opacity-50" />
                    <p className="text-sm text-muted-foreground font-medium">Klik untuk pilih gambar</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG atau PNG (Max 5MB)</p>
                  </div>
                )}

                {!analyzed && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || processing || !patientData.name}
                    className="w-full gap-2 h-12 text-lg shadow-lg shadow-primary/20"
                    size="lg"
                  >
                    {processing ? "Memproses..." : <><Upload className="w-5 h-5" /> Mulai Analisis AI</>}
                  </Button>
                )}
              </CardContent>
            </Card>

          </div>

          {/* --- KOLOM KANAN (Hasil / Panduan) --- */}
          <div className="lg:col-span-7 space-y-6">
            
            <Card className={`h-full flex flex-col ${analyzed ? "border-primary/50 shadow-md" : "bg-gray-50/50 border-dashed"}`}>
              <CardHeader>
                <CardTitle>{analyzed ? "Laporan Hasil Analisis" : "Panel Informasi"}</CardTitle>
                <CardDescription>
                  {analyzed ? "Perbandingan visual dan deteksi kecerdasan buatan" : "Panduan penggunaan sistem"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col gap-6">
                {/* PROCESSING STATE */}
                {processing && (
                  <div className="flex-1 flex flex-col items-center justify-center py-10 space-y-6">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-muted rounded-full"></div>
                        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-lg font-semibold">Menganalisis Citra...</p>
                        <p className="text-sm text-muted-foreground">Mohon tunggu sebentar</p>
                    </div>
                  </div>
                )}

                {/* RESULT STATE */}
                {analyzed && !processing && (
                  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Status Box */}
                    <div className={`p-6 rounded-xl border-2 ${
                      results.status === "positive" 
                        ? "bg-red-50 border-red-100" 
                        : "bg-green-50 border-green-100"
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Prediksi AI</p>
                            <h2 className={`text-3xl font-bold ${results.status === "positive" ? "text-red-600" : "text-green-600"}`}>
                                {results.prediction}
                            </h2>
                        </div>
                        {results.status === "positive" ? (
                          <div className="p-3 bg-red-100 rounded-full text-red-600"><AlertCircle className="w-8 h-8" /></div>
                        ) : (
                          <div className="p-3 bg-green-100 rounded-full text-green-600"><CheckCircle2 className="w-8 h-8" /></div>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tingkat Keyakinan</span>
                            <span className="font-bold">{results.confidence}%</span>
                        </div>
                        <Progress value={results.confidence} className={`h-3 ${results.status === "positive" ? "bg-red-200" : "bg-green-200"}`} />
                      </div>
                    </div>

                    {/* Ringkasan Data Pasien (Diupdate juga) */}
                    <div className="bg-muted/30 border rounded-lg p-3 text-sm flex gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground block">Pasien:</span>
                            <span className="font-medium">{patientData.name}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground block">Usia:</span>
                            {/* 👇 TAMPILKAN SATUAN USIA */}
                            <span className="font-medium">{patientData.age} {patientData.ageUnit}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground block">Gender:</span>
                            <span className="font-medium">{patientData.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                        </div>
                    </div>

                    {/* Visual Comparison */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <ScanEye className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Visualisasi Komparatif</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="border rounded-xl overflow-hidden bg-black aspect-square flex items-center justify-center shadow-sm">
                                    <img src={preview} alt="Original" className="w-full h-full object-contain" />
                                </div>
                                <p className="text-xs font-bold text-center uppercase text-muted-foreground tracking-widest">Citra Asli</p>
                            </div>
                            <div className="space-y-2">
                                <div className="border rounded-xl overflow-hidden bg-black aspect-square flex items-center justify-center relative shadow-sm group">
                                    <img src={preview} alt="Heatmap" className="w-full h-full object-contain opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/40 to-transparent opacity-80 mix-blend-overlay"></div>
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">AI Focus</span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-center uppercase text-muted-foreground tracking-widest">Heatmap Overlay</p>
                            </div>
                        </div>
                    </div>

                    {/* Rekomendasi Tindakan */}
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 space-y-3">
                        <div className="flex items-center gap-2 text-blue-800">
                            <Stethoscope className="w-5 h-5" />
                            <h3 className="font-semibold">Rekomendasi Tindakan</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-blue-900/80">
                            {results.status === "positive" ? (
                                <>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>Lakukan pemeriksaan konfirmasi (TCM / BTA).</li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>Evaluasi gejala klinis lebih lanjut.</li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>Isolasi pasien jika diperlukan.</li>
                                </>
                            ) : (
                                <>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>Observasi perkembangan gejala.</li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>Jadwalkan pemeriksaan ulang jika keluhan berlanjut.</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Button onClick={handleSave} className="w-full gap-2 h-12" variant="outline">
                      <Save className="w-4 h-4" />
                      Simpan ke Riwayat
                    </Button>
                  </div>
                )}

                {/* EMPTY STATE */}
                {!analyzed && !processing && (
                  <div className="flex-1 flex flex-col space-y-6 text-muted-foreground px-4">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Standar Citra</h3>
                            <p className="text-sm mt-1 leading-relaxed">
                                Pastikan citra rontgen memiliki pencahayaan yang cukup, tidak blur, dan mencakup seluruh area paru-paru (apices hingga costophrenic angles).
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                            <Microscope className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Format File</h3>
                            <p className="text-sm mt-1 leading-relaxed">
                                Sistem mendukung format <strong>JPG, JPEG, dan PNG</strong>. Ukuran file maksimal 5MB untuk performa analisis optimal.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600 shrink-0">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Disclaimer</h3>
                            <p className="text-sm mt-1 leading-relaxed">
                                Hasil analisis adalah prediksi AI. Diagnosis final tetap harus ditegakkan oleh Dokter Penanggung Jawab Pasien (DPJP).
                            </p>
                        </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analisis;