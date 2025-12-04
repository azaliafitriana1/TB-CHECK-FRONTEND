import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User as UserIcon } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya asisten edukasi TBCheck. Saya dapat membantu menjawab pertanyaan seputar TB (Tuberkulosis). Silakan bertanya!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  
  // 1. Ref untuk auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Effect: Scroll ke bawah setiap kali pesan bertambah
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Dummy responses
  const dummyResponses = [
    "Terima kasih atas pertanyaan Anda. TB (Tuberkulosis) adalah penyakit infeksi menular yang disebabkan oleh bakteri Mycobacterium tuberculosis.",
    "Gejala umum TB meliputi: batuk terus-menerus lebih dari 2-3 minggu, batuk berdarah, demam, dan penurunan berat badan.",
    "TB dapat disembuhkan dengan pengobatan rutin selama 6-9 bulan. Pasien harus disiplin meminum obat.",
    "Penularan TB terjadi melalui udara (droplet) ketika penderita batuk atau bersin.",
    "Untuk diagnosis pasti, diperlukan pemeriksaan dahak dan rontgen dada (seperti fitur yang tersedia di aplikasi ini).",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Apa itu TB?",
    "Bagaimana cara penularan TB?",
    "Apa saja gejala TB?",
    "Bagaimana pengobatan TB?",
  ];

// Jangan lupa import: import { ArrowLeft } from "lucide-react";

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-10">
        
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
            <h1 className="text-3xl font-bold text-foreground">Chatbot Edukasi</h1>
            <p className="text-muted-foreground mt-1">Tanya jawab seputar TB dan kesehatan paru</p>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col shadow-md">
          <CardHeader className="border-b bg-card z-10">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Asisten TBCheck
            </CardTitle>
            <CardDescription>
              Chatbot ini hanya untuk edukasi, bukan untuk diagnosis medis
            </CardDescription>
          </CardHeader>

          {/* PERBAIKAN DI SINI: tambahkan overflow-hidden */}
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-muted/20">
            
            {/* ScrollArea mengisi sisa ruang (flex-1) */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        message.sender === "bot"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white text-primary border border-primary/20"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <UserIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === "bot"
                          ? "bg-white border border-border text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-[10px] mt-1 ${
                        message.sender === "bot" ? "text-muted-foreground" : "text-primary-foreground/70"
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Elemen dummy untuk target auto-scroll */}
                <div ref={scrollRef} />
              </div>

              {/* Suggested Questions (Hanya muncul jika chat masih kosong/awal) */}
              {messages.length === 1 && (
                <div className="mt-8 max-w-3xl mx-auto">
                  <p className="text-xs text-center text-muted-foreground mb-3">Pertanyaan yang sering diajukan:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInput(question)}
                        className="text-xs bg-white hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4 bg-card">
              <div className="flex gap-2 max-w-3xl mx-auto">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pertanyaan seputar TB..."
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;