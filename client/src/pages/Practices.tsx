import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Leaf, Play, Headphones, Video, Minimize2, Maximize2, X, Info } from "lucide-react";
import { getRecommendations, mediaLibrary, type MediaItem } from "@/lib/mediaLibrary";
import type { WellnessCheckin } from "@shared/schema";

// Helper to extract YouTube thumbnail
function getYoutubeThumbnail(url: string) {
  const match = url.match(/embed\/([^?]+)/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return "";
}

export default function Practices() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [infoMedia, setInfoMedia] = useState<MediaItem | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "video" | "audio">("all");

  const { data: wellnessCheckins = [] } = useQuery<WellnessCheckin[]>({
    queryKey: ["/api/wellness-checkins"],
  });

  const hasBaseline = wellnessCheckins.length > 0;
  const latestCheckin = hasBaseline ? wellnessCheckins[wellnessCheckins.length - 1] : undefined;
  const recommendations = getRecommendations(latestCheckin);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring" } },
  };

  const handlePlay = (item: MediaItem) => {
    setActiveMedia(item);
    setIsMinimized(false);
  };

  const renderCard = (item: MediaItem) => (
    <motion.div key={item.id} variants={itemVariants} layoutId={`card-${item.id}`}>
      <Card 
        className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/40 bg-card/60 backdrop-blur-md cursor-pointer h-full flex flex-col"
        onClick={() => handlePlay(item)}
      >
        <div className="aspect-video relative bg-muted/30 flex items-center justify-center overflow-hidden shrink-0">
          {/* Thumbnail Image */}
          <img 
            src={getYoutubeThumbnail(item.url)} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          
          <div className="absolute top-3 right-3 z-30 flex gap-2">
            <div 
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm border border-white/10 hover:bg-black/60" 
              title="Read full info & benefits"
              onClick={(e) => { e.stopPropagation(); setInfoMedia(item); }}
            >
              <Info className="w-4 h-4 text-white/90" />
            </div>
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl backdrop-blur-md transition-transform duration-300 scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100">
              <Play className="w-7 h-7 text-primary-foreground ml-1" />
            </div>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
            {item.type === "video" ? (
              <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                <Video className="w-3.5 h-3.5" /> Video
              </div>
            ) : (
              <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                <Headphones className="w-3.5 h-3.5" /> Audio
              </div>
            )}
            <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {item.durationMins}:00
            </div>
          </div>
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {item.conditionTags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-auto">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg font-semibold">NIVARANA</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Mind & Body Practices</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Curated Ayurvedic guided meditations, breathwork, and yoga asanas to balance your doshas and improve your wellbeing.
          </p>
        </motion.div>

        {recommendations.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> Recommended For You
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {recommendations.map(renderCard)}
            </div>
          </motion.div>
        )}

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold tracking-tight">Full Library</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="mb-8 bg-muted/50 p-1 flex-wrap h-auto justify-start sm:justify-center">
              <TabsTrigger value="all" className="rounded-md px-6 py-2">All Practices</TabsTrigger>
              <TabsTrigger value="video" className="rounded-md gap-2 px-6 py-2"><Video className="w-4 h-4" /> Videos</TabsTrigger>
              <TabsTrigger value="audio" className="rounded-md gap-2 px-6 py-2"><Headphones className="w-4 h-4" /> Audio & Music</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 outline-none">
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {mediaLibrary
                    .filter((item) => activeTab === "all" || item.type === activeTab)
                    .map(renderCard)}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Minimizable Floating Player */}
      <AnimatePresence>
        {activeMedia && (
          <>
            {/* Backdrop overlay for maximized state */}
            {!isMinimized && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
                onClick={() => setIsMinimized(true)}
              />
            )}

            <motion.div
              layout
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed z-[100] bg-background border shadow-2xl overflow-hidden flex flex-col transition-[width,height,border-radius,bottom,right] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isMinimized 
                  ? "bottom-4 right-4 w-[280px] sm:w-[320px] rounded-2xl border-primary/30 shadow-primary/20" 
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl max-h-[90vh] rounded-3xl border-border/40 shadow-black/50"
                }
              `}
            >
              {/* Header Bar */}
              <div 
                className={`flex items-center justify-between px-4 py-3 bg-card border-b cursor-pointer hover:bg-muted/50 transition-colors ${isMinimized ? "border-primary/20 bg-primary/5" : "border-border/40"}`}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {isMinimized && (
                    <div className="w-8 h-8 shrink-0 rounded-md overflow-hidden bg-black flex items-center justify-center">
                      {activeMedia.type === "video" ? <Video className="w-4 h-4 text-white/70" /> : <Headphones className="w-4 h-4 text-white/70" />}
                    </div>
                  )}
                  <div className="font-bold text-sm truncate">{activeMedia.title}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/20" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive" onClick={(e) => { e.stopPropagation(); setActiveMedia(null); setIsMinimized(false); }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Video Player Area */}
              <div className={`bg-black relative transition-all duration-500 shrink-0 ${isMinimized ? "h-0 opacity-0 overflow-hidden" : "aspect-video w-full opacity-100"}`}>
                <iframe
                  src={activeMedia.url}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Minimised Player Sub-Area (Optional audio controls / info) */}
              {isMinimized && (
                <div className="h-[120px] bg-black relative">
                   <iframe
                    src={activeMedia.url}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              )}

              {/* Expanded Info Area */}
              {!isMinimized && (
                <div className="p-6 overflow-y-auto bg-card flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {activeMedia.type === "video" ? (
                      <div className="px-3 py-1.5 rounded-md bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Video className="w-4 h-4" /> Video
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Headphones className="w-4 h-4" /> Audio
                      </div>
                    )}
                    <span className="text-muted-foreground text-sm font-semibold flex items-center gap-1.5">
                       {activeMedia.durationMins} minutes
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl leading-tight mb-3">
                    {activeMedia.title}
                  </h2>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {activeMedia.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-border/40">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Therapeutic Focus</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeMedia.conditionTags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
                         <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                           <Sparkles className="w-4 h-4" /> Immediate Perks
                         </h4>
                         <ul className="space-y-2">
                           {activeMedia.perks.map(perk => (
                             <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                               {perk}
                             </li>
                           ))}
                         </ul>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
                         <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                           <Leaf className="w-4 h-4" /> Future Benefits
                         </h4>
                         <p className="text-sm text-muted-foreground leading-relaxed">
                           {activeMedia.futureBenefits}
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Info Dialog */}
      <Dialog open={!!infoMedia} onOpenChange={(open) => !open && setInfoMedia(null)}>
        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-border/40 p-6 overflow-hidden shadow-2xl">
          {infoMedia && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {infoMedia.type === "video" ? (
                    <div className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" /> Video
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                      <Headphones className="w-3.5 h-3.5" /> Audio
                    </div>
                  )}
                  <span className="text-muted-foreground text-sm font-semibold">{infoMedia.durationMins} mins</span>
                </div>
                <DialogTitle className="font-serif text-2xl sm:text-3xl leading-tight">
                  {infoMedia.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-3 leading-relaxed text-foreground/80">
                  {infoMedia.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Therapeutic Focus</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {infoMedia.conditionTags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold capitalize">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                       <Sparkles className="w-4 h-4" /> Immediate Perks
                     </h4>
                     <ul className="space-y-2">
                       {infoMedia.perks.map(perk => (
                         <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                           {perk}
                         </li>
                       ))}
                     </ul>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                       <Leaf className="w-4 h-4" /> Future Benefits
                     </h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">
                       {infoMedia.futureBenefits}
                     </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  className="gap-2" 
                  onClick={() => {
                    handlePlay(infoMedia);
                    setInfoMedia(null);
                  }}
                >
                  <Play className="w-4 h-4" /> Start Practice
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sparkles icon definition since it wasn't imported
function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
