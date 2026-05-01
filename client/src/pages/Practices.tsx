import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Leaf, Play, Headphones, Video } from "lucide-react";
import { getRecommendations, mediaLibrary, type MediaItem } from "@/lib/mediaLibrary";
import type { WellnessCheckin } from "@shared/schema";

export default function Practices() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
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
              <h2 className="font-serif text-2xl font-bold tracking-tight text-primary">Recommended For You</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendations.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card 
                    className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-primary/30 bg-primary/5 backdrop-blur-md cursor-pointer"
                    onClick={() => setActiveMedia(item)}
                  >
                    <div className="aspect-video relative bg-muted/50 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      {item.type === "video" ? (
                        <Video className="w-12 h-12 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <Headphones className="w-12 h-12 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-md transition-transform duration-300 scale-90 group-hover:scale-100">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                        {item.type === "video" ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        {item.durationMins}:00
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {item.conditionTags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif text-lg font-bold line-clamp-1 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold tracking-tight">Full Library</h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="mb-8 bg-muted/50 p-1">
              <TabsTrigger value="all" className="rounded-md px-6">All Practices</TabsTrigger>
              <TabsTrigger value="video" className="rounded-md gap-2 px-6"><Video className="w-4 h-4" /> Videos</TabsTrigger>
              <TabsTrigger value="audio" className="rounded-md gap-2 px-6"><Headphones className="w-4 h-4" /> Audio & Music</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 outline-none">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {mediaLibrary
                  .filter((item) => activeTab === "all" || item.type === activeTab)
                  .map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card 
                      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border bg-card/60 backdrop-blur-md cursor-pointer hover:border-border/80"
                      onClick={() => setActiveMedia(item)}
                    >
                      <div className="aspect-video relative bg-muted/30 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        {item.type === "video" ? (
                          <Video className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Headphones className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                        )}
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-14 h-14 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg backdrop-blur-md transition-transform duration-300 scale-90 group-hover:scale-100">
                            <Play className="w-6 h-6 text-background ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                          {item.type === "video" ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                          {item.durationMins}:00
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {item.conditionTags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-serif text-lg font-bold line-clamp-1 mb-2 group-hover:text-foreground transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Video/Audio Player Modal */}
      <Dialog open={!!activeMedia} onOpenChange={(open) => !open && setActiveMedia(null)}>
        <DialogContent className="sm:max-w-3xl bg-background/95 backdrop-blur-xl border-border/40 p-0 overflow-hidden shadow-2xl">
          {activeMedia && (
            <>
              <div className="aspect-video bg-black w-full relative">
                <iframe
                  src={activeMedia.url}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {activeMedia.type === "video" ? (
                      <div className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" /> Video
                      </div>
                    ) : (
                      <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        <Headphones className="w-3.5 h-3.5" /> Audio
                      </div>
                    )}
                    <span className="text-muted-foreground text-sm font-semibold">{activeMedia.durationMins} mins</span>
                  </div>
                  <DialogTitle className="font-serif text-2xl sm:text-3xl leading-tight">
                    {activeMedia.title}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-3 leading-relaxed text-foreground/80">
                    {activeMedia.description}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
