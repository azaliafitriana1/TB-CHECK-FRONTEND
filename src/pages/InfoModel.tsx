import { useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 Import ini
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Brain, TrendingDown, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfoModel = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const location = useLocation(); // 👈 Ambil state dari router
  const isPublicMode = location.state?.isPublic === true; // 👈 Cek apakah mode public

  // Data Real dari CSV Training_val.csv
  const chartData = [
    { epoch: 1, loss: 0.5183, valLoss: 0.6715, accuracy: 0.8034, valAccuracy: 0.8336 },
    { epoch: 2, loss: 0.2728, valLoss: 0.6513, accuracy: 0.8633, valAccuracy: 0.8336 },
    { epoch: 3, loss: 0.138, valLoss: 0.6601, accuracy: 0.953, valAccuracy: 0.8336 },
    { epoch: 4, loss: 0.1017, valLoss: 0.6788, accuracy: 0.9647, valAccuracy: 0.6387 },
    { epoch: 5, loss: 0.0837, valLoss: 0.5234, accuracy: 0.9684, valAccuracy: 0.9128 },
    { epoch: 6, loss: 0.0747, valLoss: 0.2893, accuracy: 0.9708, valAccuracy: 0.9429 },
    { epoch: 7, loss: 0.0611, valLoss: 0.1368, accuracy: 0.9791, valAccuracy: 0.9794 },
    { epoch: 8, loss: 0.0552, valLoss: 0.0611, accuracy: 0.9812, valAccuracy: 0.9857 },
    { epoch: 9, loss: 0.0596, valLoss: 0.0466, accuracy: 0.9804, valAccuracy: 0.9889 },
    { epoch: 10, loss: 0.0617, valLoss: 0.0972, accuracy: 0.9769, valAccuracy: 0.9778 },
    { epoch: 11, loss: 0.06, valLoss: 0.0423, accuracy: 0.9749, valAccuracy: 0.9857 },
    { epoch: 12, loss: 0.0343, valLoss: 0.0491, accuracy: 0.988, valAccuracy: 0.9857 },
    { epoch: 13, loss: 0.0447, valLoss: 0.0448, accuracy: 0.9874, valAccuracy: 0.9857 },
    { epoch: 14, loss: 0.031, valLoss: 0.0321, accuracy: 0.9899, valAccuracy: 0.9905 },
    { epoch: 15, loss: 0.0381, valLoss: 0.04, accuracy: 0.9859, valAccuracy: 0.9905 },
    { epoch: 16, loss: 0.0361, valLoss: 0.0585, accuracy: 0.9901, valAccuracy: 0.9873 },
    { epoch: 17, loss: 0.039, valLoss: 0.0396, accuracy: 0.9899, valAccuracy: 0.9921 },
    { epoch: 18, loss: 0.041, valLoss: 0.0514, accuracy: 0.9876, valAccuracy: 0.9842 },
    { epoch: 19, loss: 0.0286, valLoss: 0.0454, accuracy: 0.9884, valAccuracy: 0.9889 },
    { epoch: 20, loss: 0.0229, valLoss: 0.0467, accuracy: 0.9954, valAccuracy: 0.9873 },
    { epoch: 21, loss: 0.0208, valLoss: 0.0352, accuracy: 0.9936, valAccuracy: 0.9905 },
    { epoch: 22, loss: 0.0299, valLoss: 0.0434, accuracy: 0.9922, valAccuracy: 0.9889 },
    { epoch: 23, loss: 0.0277, valLoss: 0.0528, accuracy: 0.9947, valAccuracy: 0.9873 },
    { epoch: 24, loss: 0.0192, valLoss: 0.0356, accuracy: 0.9959, valAccuracy: 0.9889 },
    { epoch: 25, loss: 0.0272, valLoss: 0.0452, accuracy: 0.9915, valAccuracy: 0.9889 },
    { epoch: 26, loss: 0.0161, valLoss: 0.0429, accuracy: 0.9969, valAccuracy: 0.9905 },
    { epoch: 27, loss: 0.0155, valLoss: 0.0442, accuracy: 0.9952, valAccuracy: 0.9889 },
    { epoch: 28, loss: 0.0236, valLoss: 0.0479, accuracy: 0.995, valAccuracy: 0.9889 },
    { epoch: 29, loss: 0.0159, valLoss: 0.0393, accuracy: 0.9952, valAccuracy: 0.9889 },
  ];

  const modelSpecs = [
    { label: "Arsitektur", value: "InceptionV3" },
    { label: "Dataset", value: "Kaggle Chest X-Ray" },
    { label: "Total Images", value: "4,200" },
    { label: "Optimizer", value: "Adam" },
    { label: "Learning Rate", value: "0.001" },
    { label: "Batch Size", value: "16" },
    { label: "Epochs", value: "29" },
    { label: "Input Size", value: "299 x 299 px" },
  ];

  const performance = [
    { metric: "Accuracy", value: "99.52%", color: "bg-success" },
    { metric: "Precision", value: "99.17%", color: "bg-primary" },
    { metric: "Recall", value: "97.05%", color: "bg-chart-4" },
    { metric: "F1-Score", value: "98.58%", color: "bg-warning" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Grafik berhasil direfresh");
    }, 1500);
  };

  return (
    <DashboardLayout isPublic={isPublicMode}>
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
        
        {/* Header dengan Tombol Kembali (Logika Public vs Dashboard) */}
        <div className="relative flex items-center justify-center py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            // 👇 Logika Navigasi Cerdas
            onClick={() => navigate(isPublicMode ? "/" : "/dashboard")} 
            className="absolute left-0 gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Info Model AI</h1>
            <p className="text-muted-foreground mt-1">Detail dan performa model deteksi TB</p>
          </div>
        </div>

        {/* Model Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Spesifikasi Model
            </CardTitle>
            <CardDescription>Konfigurasi dan parameter model deep learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {modelSpecs.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="font-semibold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {performance.map((perf) => (
            <Card key={perf.metric}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {perf.metric}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${perf.color}`} />
                  <p className="text-2xl font-bold">{perf.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- GRAPH 1: LOSS --- */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  Training & Validation Loss
                </CardTitle>
                <CardDescription>Grafik penurunan Loss per Epoch</CardDescription>
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  Training Loss
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-4" />
                  Validation Loss
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={chartData} 
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="epoch" 
                  label={{ value: 'Epoch', position: 'insideBottom', offset: -12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="loss" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="Training Loss"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="valLoss" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={3}
                  name="Validation Loss"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* --- GRAPH 2: ACCURACY --- */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Model Accuracy
                </CardTitle>
                <CardDescription>Peningkatan Akurasi per Epoch</CardDescription>
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  Training Acc
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-4" />
                  Validation Acc
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="epoch" 
                  label={{ value: 'Epoch', position: 'insideBottom', offset: -12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[0, 1]} 
                  label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="Training Acc"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="valAccuracy" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={3}
                  name="Validation Acc"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Tentang Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Model berbasis arsitektur InceptionV3 dengan pre-training RadImageNet (jutaan citra medis), 
              model ini memiliki pemahaman anatomi yang superior dibanding model biasa. 
              Proses fine-tuning khusus memungkinkannya mendeteksi pola TBC yang samar dengan akurasi dan presisi tinggi.
            </p>
            <div className="p-4 bg-accent/50 rounded-lg border border-border mt-4">
              <p className="text-sm font-medium mb-2">⚠️ Disclaimer</p>
              <p className="text-sm text-muted-foreground">
                Model AI ini adalah alat bantu diagnostik dan tidak menggantikan penilaian klinis 
                dari tenaga medis profesional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InfoModel;