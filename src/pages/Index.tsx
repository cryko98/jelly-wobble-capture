import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const Index = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userHandle, setUserHandle] = useState("");
  const phoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!phoneRef.current) return;

    try {
      toast.info("Generating your Jelly...");
      
      const canvas = await html2canvas(phoneRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = "jelly-with-wobbles.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success("Your Jelly has been downloaded!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Jelly with Wobbles
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your own jellyjelly video chat moment
          </p>
        </header>

        {/* User Input Section */}
        <div className="bg-card rounded-2xl shadow-lg p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="handle" className="text-sm font-medium">
              Your Handle (optional)
            </Label>
            <Input
              id="handle"
              type="text"
              placeholder="@myhandle"
              value={userHandle}
              onChange={(e) => setUserHandle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-upload" className="text-sm font-medium">
              Upload Your Image
            </Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-secondary/30"
            >
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {userImage ? "Image uploaded! Click to change" : "Click to upload your image"}
              </p>
            </div>
          </div>
        </div>

        {/* iPhone Mockup */}
        <div className="flex flex-col items-center space-y-6">
          <div
            ref={phoneRef}
            className="relative w-[320px] sm:w-[360px] h-[650px] sm:h-[720px] rounded-[3rem] p-3 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, hsl(220 10% 12%), hsl(220 10% 8%))",
              boxShadow: "0 25px 50px -12px hsl(220 20% 10% / 0.4)",
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[hsl(220,10%,8%)] rounded-b-3xl z-10" />

            {/* Screen */}
            <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              {/* Top Half - Wobbles */}
              <div className="relative h-1/2 bg-gray-900">
                <img
                  src="https://pbs.twimg.com/media/G5ElK73XUAEWx6F?format=jpg&name=small"
                  alt="Wobbles"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute top-4 left-4 space-y-1">
                  <p className="text-white text-sm font-semibold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                    @wobbles
                  </p>
                  <p className="text-white/90 text-xs font-medium" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                    jellyjelly
                  </p>
                </div>
              </div>

              {/* Bottom Half - User */}
              <div className="relative h-1/2 bg-gray-800">
                {userImage ? (
                  <>
                    <img
                      src={userImage}
                      alt="Your image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 space-y-1">
                      {userHandle && (
                        <p className="text-white text-sm font-semibold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                          {userHandle.startsWith("@") ? userHandle : `@${userHandle}`}
                        </p>
                      )}
                      <p className="text-white/90 text-xs font-medium" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                        jellyjelly
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                    <div className="text-center space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-gray-400 text-sm">Upload your image above</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            size="lg"
            className="w-full max-w-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Your Jelly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
