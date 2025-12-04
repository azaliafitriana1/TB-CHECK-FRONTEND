import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Printer, FileCheck, ScanEye, Stethoscope } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
// @ts-ignore
import html2pdf from "html2pdf.js";
import logoImage from "@/assets/logo aja.png";

const DetailPemeriksaan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Dummy Detail Data (Disinkronkan dengan Page Analisis)
  const examination = {
    id: id || "EX-2024001",
    patientName: "Ahmad Santoso",
    patientAge: "45",
    patientGender: "Laki-laki",
    date: "2024-01-15",
    result: "TB Terdeteksi",
    confidence: 87,
    status: "positive" as const,
    // Explanation dihapus, diganti logika rekomendasi
    symptoms: ["Batuk berdahak > 2 minggu", "Demam tinggi (malam hari)", "Keringat dingin tanpa aktivitas", "Penurunan berat badan drastis"],
  };

  // Logika Rekomendasi (Sama seperti di Analisis.tsx)
  const recommendations = examination.status === "positive" 
    ? [
        "Lakukan pemeriksaan konfirmasi (TCM / BTA)",
        "Evaluasi gejala klinis lebih lanjut",
        "Isolasi pasien jika diperlukan"
      ]
    : [
        "Observasi perkembangan gejala",
        "Jadwalkan pemeriksaan ulang jika keluhan berlanjut"
      ];

  const handleDownload = () => {
    const element = contentRef.current;
    if (!element) return;

    setIsDownloading(true);
    toast.info("Sedang mencetak dokumen...");

    const opt = {
      margin:       0, 
      filename:     `Laporan_Medis_${examination.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        scrollY: 0,
        // 👇 TAMBAHAN PENTING: Paksa koordinat mulai dari 0
        x: 0,
        y: 0 
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsDownloading(false);
        toast.success("PDF Berhasil Disimpan!");
      })
      .catch((err: any) => {
        console.error(err);
        setIsDownloading(false);
        toast.error("Gagal membuat PDF.");
      });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        
        {/* HEADER TOMBOL (Tidak masuk PDF) */}
        <div className="flex items-center justify-between no-print">
          <Button variant="ghost" size="sm" onClick={() => navigate("/riwayat")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading} className="gap-2 bg-primary hover:bg-primary/90">
            {isDownloading ? <Printer className="w-4 h-4 animate-bounce" /> : <Download className="w-4 h-4" />}
            {isDownloading ? "Sedang Mencetak..." : "Download PDF Resmi"}
          </Button>
        </div>

        {/* PREVIEW CONTAINER */}
        <div className="flex justify-center bg-gray-100/80 p-4 md:p-8 rounded-xl border border-dashed border-gray-300 overflow-auto">
          
          {/* --- KERTAS A4 --- */}
          <div 
            ref={contentRef} 
            className="bg-white text-black shadow-lg flex flex-col justify-between"
            style={{ 
              width: '210mm', 
              height: '296mm',
              overflow: "hidden",
              padding: '15mm 20mm 20mm 20mm', 
              boxSizing: 'border-box',
              fontFamily: 'Arial, sans-serif'
            }} 
          >
            
            {/* BAGIAN ATAS (KONTEN UTAMA) */}
            <div>
                {/* 1. KOP SURAT */}
                <div className="flex justify-between items-center border-b-2 border-gray-800 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                        <img 
                          src={logoImage}        
                          alt="Logo TBCheck" 
                          className="w-12 h-12 object-contain rounded"
                        />
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-[#24A79A] uppercase m-0 leading-none">TBCheck</h1>
                            <p className="text-[10px] font-bold text-gray-600 tracking-wide mt-1">Sistem Deteksi TB Berbasis AI</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-800 m-0">LAPORAN PEMERIKSAAN</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-1">Ref: {examination.id}</p>
                    </div>
                </div>

                {/* 2. IDENTITAS PASIEN */}
                <div className="mb-6 border border-gray-300 rounded p-3 bg-gray-50">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr>
                                <td className="w-24 py-1 text-gray-500 font-medium">Nama Lengkap</td>
                                <td className="py-1 px-2 font-bold">: {examination.patientName}</td>
                                <td className="w-24 py-1 text-gray-500 font-medium">Tgl Periksa</td>
                                <td className="py-1 px-2 font-bold">: {new Date(examination.date).toLocaleDateString('id-ID')}</td>
                            </tr>
                            <tr>
                                <td className="py-1 text-gray-500 font-medium">Usia</td>
                                <td className="py-1 px-2 font-bold">: {examination.patientAge} Tahun</td>
                                <td className="py-1 text-gray-500 font-medium">Gender</td>
                                <td className="py-1 px-2 font-bold">: {examination.patientGender}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3. HASIL DIAGNOSIS */}
                <div className="mb-8">
                    <div className={`border-2 rounded-lg p-4 text-center ${
                        examination.status === "positive" 
                        ? "border-red-500 bg-red-50" 
                        : "border-green-500 bg-green-50"
                    }`}>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">HASIL ANALISIS AI</p>
                        <h2 className={`text-2xl font-black uppercase tracking-tight m-0 ${
                            examination.status === "positive" ? "text-red-600" : "text-green-600"
                        }`}>
                            {examination.status === "positive" ? "TERINDIKASI TUBERKULOSIS" : "NORMAL / NEGATIF"}
                        </h2>
                        <p className="text-xs font-medium text-gray-600 mt-2">
                            Tingkat Keyakinan Model: <strong>{examination.confidence}%</strong>
                        </p>
                    </div>
                </div>

                {/* 4. VISUALISASI (Side by Side) */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 border-b border-gray-200 pb-1 flex items-center gap-2">
                        <ScanEye className="w-3 h-3" /> Visualisasi Komparatif
                    </h3>
                    <div className="flex justify-between gap-4">
                        {/* Kiri: Asli */}
                        <div style={{ width: '48%' }}>
                            <div className="border border-gray-300 p-1 bg-white rounded mb-1">
                                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] border border-dashed border-gray-300">
                                   CITRA RONTGEN ASLI
                                </div>
                            </div>
                            <p className="text-[10px] text-center text-gray-500 font-bold uppercase">Original</p>
                        </div>
                        {/* Kanan: Heatmap */}
                        <div style={{ width: '48%' }}>
                            <div className="border border-gray-300 p-1 bg-white rounded mb-1 relative">
                                <div className="w-full aspect-square bg-gray-800 flex items-center justify-center text-gray-400 text-[10px]">
                                   HEATMAP OVERLAY
                                </div>
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-2 py-0.5 rounded">AI Focus</div>
                            </div>
                            <p className="text-[10px] text-center text-gray-500 font-bold uppercase">Heatmap AI</p>
                        </div>
                    </div>
                </div>

                {/* 5. DETAIL KLINIS & REKOMENDASI (2 Kolom) */}
                <div className="flex justify-between items-start mb-6">
                    
                    {/* Kolom Kiri: Gejala */}
                    <div style={{ width: '48%' }}>
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 border-b border-gray-200 pb-1">Gejala Klinis</h3>
                        <table className="w-full text-sm text-gray-700">
                            <tbody>
                                {examination.symptoms.map((sym, idx) => (
                                    <tr key={idx}>
                                        <td className="align-top w-4 py-1 text-[#24A79A] font-bold">•</td>
                                        <td className="align-top py-1">{sym}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Kolom Kanan: Rekomendasi */}
                    <div style={{ width: '48%' }}>
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 border-b border-gray-200 pb-1 flex items-center gap-2">
                            <Stethoscope className="w-3 h-3" /> Rekomendasi Tindakan
                        </h3>
                        <div className="bg-blue-50 border border-blue-100 rounded p-3">
                            <table className="w-full text-sm text-blue-900">
                                <tbody>
                                    {recommendations.map((rec, idx) => (
                                        <tr key={idx}>
                                            <td className="align-top w-4 py-1 text-blue-500 font-bold">-</td>
                                            <td className="align-top py-1">{rec}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* BAGIAN BAWAH (FOOTER) - Sticky Bottom */}
            <div className="mt-auto pt-4 flex justify-between items-end border-t-2 border-gray-100" style={{ pageBreakInside: 'avoid' }}>
                <div className="w-3/5 text-[9px] text-gray-400 leading-snug">
                    <strong className="text-gray-500">CATATAN (DISCLAIMER):</strong><br/>
                    Dokumen ini dihasilkan secara otomatis oleh sistem kecerdasan buatan (AI). 
                    Hasil ini bersifat penunjang diagnostik awal dan <u>bukan keputusan medis final</u>. 
                    Validasi oleh Dokter Spesialis Radiologi tetap diperlukan.
                </div>
                
                <div className="text-center w-32">
                    <p className="text-[10px] text-gray-600 mb-8">Laporan diunduh pada {new Date().toLocaleDateString('id-ID')}</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetailPemeriksaan;