import { type WellnessCheckin } from "@shared/schema";

export type MediaType = "audio" | "video";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  durationMins: number;
  description: string;
  conditionTags: string[];
  thumbnailUrl?: string; 
  url: string; 
  perks: string[];
  futureBenefits: string;
}

export const mediaLibrary: MediaItem[] = [
  // ---------------- VIDEOS (10 Items) ----------------
  {
    id: "v1-morning-yoga",
    title: "15-Minute Morning Vinyasa",
    type: "video",
    durationMins: 15,
    description: "A gentle morning flow to awaken the body, build gentle heat, and clear Kapha stagnation.",
    conditionTags: ["energy", "sluggishness", "morning"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1",
    perks: ["Instant Energy Boost", "Improves Flexibility", "Stimulates Digestion"],
    futureBenefits: "Consistent practice will reset your circadian rhythm, permanently reducing morning grogginess and increasing your metabolic baseline.",
  },
  {
    id: "a1-yoga-nidra",
    title: "10-Minute Yoga Nidra for Deep Rest",
    type: "audio",
    durationMins: 10,
    description: "A guided yogic sleep practice to calm the nervous system and prepare the mind for deep, restorative sleep.",
    conditionTags: ["stress", "sleep"],
    url: "https://www.youtube.com/embed/7H0FKzeuVVs?autoplay=1",
    perks: ["Rapid Stress Relief", "Lowers Heart Rate", "Calms Racing Thoughts"],
    futureBenefits: "Regular Yoga Nidra rewires the nervous system to handle stressful triggers with calm resilience and drastically improves deep REM sleep cycles over time.",
  },
  {
    id: "v2-digestive-yoga",
    title: "Agni Sara: Digestive Fire Asanas",
    type: "video",
    durationMins: 15,
    description: "A sequence of gentle twists and abdominal compressions designed to stimulate Agni (digestive fire) and relieve bloating.",
    conditionTags: ["digestion", "bloating"],
    url: "https://www.youtube.com/embed/Zz_xY5fQ9F4?autoplay=1",
    perks: ["Relieves Bloating", "Massages Internal Organs", "Ignites Metabolism"],
    futureBenefits: "Practicing this regularly will permanently strengthen your gut health, reducing IBS symptoms and ensuring optimal nutrient absorption from your meals.",
  },
  {
    id: "a2-grounding",
    title: "Grounding Vata Meditation",
    type: "audio",
    durationMins: 8,
    description: "A stabilizing meditation focusing on the root chakra to bring scattered, anxious thoughts back to earth.",
    conditionTags: ["anxiety", "vata"],
    url: "https://www.youtube.com/embed/ZToicYcHIOU?autoplay=1",
    perks: ["Reduces Anxiety", "Enhances Focus", "Creates Emotional Stability"],
    futureBenefits: "By balancing your Vata dosha, you will experience less chronic anxiety, eliminate mental fog, and build a steadfast, unshakable emotional foundation.",
  },
  {
    id: "v3-kapalbhati",
    title: "Kapalabhati Breathwork (Video Guide)",
    type: "video",
    durationMins: 5,
    description: "Skull-shining breath to clear sluggishness, stimulate digestion, and instantly boost your energy levels.",
    conditionTags: ["energy", "focus"],
    url: "https://www.youtube.com/embed/j7rKKpwdXjc?autoplay=1",
    perks: ["Clears Sinuses", "Oxygenates the Brain", "Burns Abdominal Fat"],
    futureBenefits: "Daily practice of Kapalabhati permanently expands your lung capacity, strengthens your diaphragm, and provides a natural, caffeine-free defense against afternoon slumps.",
  },
  {
    id: "a3-rain-sleep",
    title: "Monsoon Rain Sleep Soundscape",
    type: "audio",
    durationMins: 60,
    description: "Continuous soothing rain sounds to mask background noise and induce deep delta-wave sleep.",
    conditionTags: ["sleep", "insomnia"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
    perks: ["Masks Distracting Noises", "Induces Delta Waves", "Soothes the Mind"],
    futureBenefits: "Listening to acoustic nature rhythms conditions your brain to fall asleep 40% faster over time, curing mild insomnia and deeply regulating your internal clock.",
  },
  {
    id: "v4-evening-wind-down",
    title: "Gentle Evening Stretching",
    type: "video",
    durationMins: 20,
    description: "Slow, restorative stretches to calm the nervous system before bed. Ideal for Vata imbalance.",
    conditionTags: ["sleep", "stress", "vata"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
    perks: ["Releases Muscle Tension", "Prepares Body for Sleep", "Improves Posture"],
    futureBenefits: "Releasing trapped physical tension every night prevents the accumulation of chronic pain in the neck and shoulders, leading to a much more pain-free and flexible body.",
  },
  {
    id: "a4-om-chanting",
    title: "108 OM Mantra Chanting",
    type: "audio",
    durationMins: 25,
    description: "Resonant OM chanting to center the mind, lower blood pressure, and create a protective energetic field.",
    conditionTags: ["focus", "spiritual"],
    url: "https://www.youtube.com/embed/80K2X0o2n18?autoplay=1",
    perks: ["Lowers Blood Pressure", "Activates Vagus Nerve", "Deepens Concentration"],
    futureBenefits: "The vibrational frequency of chanting OM stimulates the vagus nerve, which over weeks of practice permanently increases your threshold for handling psychological stress.",
  },
  {
    id: "v5-pitta-cooling-flow",
    title: "Cooling Lunar Flow (Chandra Namaskar)",
    type: "video",
    durationMins: 12,
    description: "A slow-paced, cooling yoga flow designed to pacify excess Pitta and reduce body heat.",
    conditionTags: ["heat", "irritability", "pitta"],
    url: "https://www.youtube.com/embed/b1H3xO3x_Js?autoplay=1", 
    perks: ["Reduces Body Heat", "Calms Frustration", "Soothes Inflammation"],
    futureBenefits: "Regularly practicing lunar flows balances the endocrine system, dramatically reducing hormone-driven mood swings and chronic inflammatory conditions like acid reflux.",
  },
  {
    id: "a5-5min-reset",
    title: "5-Minute Midday Reset",
    type: "audio",
    durationMins: 5,
    description: "A quick guided body scan to release jaw tension and drop your shoulders during a busy workday.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/inpok4MKVLM?autoplay=1",
    perks: ["Instant Tension Release", "Resets Nervous System", "Enhances Productivity"],
    futureBenefits: "By interrupting the stress cycle during the day, you prevent cortisol accumulation, protecting yourself from long-term burnout and adrenal fatigue.",
  },
  {
    id: "v6-kapha-energizing",
    title: "Dynamic Sun Salutations",
    type: "video",
    durationMins: 10,
    description: "Fast-paced Surya Namaskar to break a sweat, stimulate circulation, and clear heavy Kapha energy.",
    conditionTags: ["weight", "sluggishness", "kapha"],
    url: "https://www.youtube.com/embed/4pKly2JojMw?autoplay=1",
    perks: ["Boosts Circulation", "Tones Full Body", "Clears Brain Fog"],
    futureBenefits: "This dynamic cardiovascular practice will permanently elevate your resting metabolic rate and build lean, functional muscle mass across your entire body.",
  },
  {
    id: "a6-pitta-cooling",
    title: "Cooling Breath (Sheetali Pranayama)",
    type: "audio",
    durationMins: 5,
    description: "Audio guide for the cooling breath technique. Excellent for hot flashes, anger, or summer heat.",
    conditionTags: ["heat", "anger", "pitta"],
    url: "https://www.youtube.com/embed/lFcSrYw-ARY?autoplay=1",
    perks: ["Lowers Core Temperature", "Reduces Anger", "Hydrates the System"],
    futureBenefits: "Mastering Sheetali provides a lifelong tool to instantly control anger outbursts and rapidly cool down the body, protecting the liver from excess heat.",
  },
  {
    id: "v7-posture-correction",
    title: "Heart-Opening Asanas",
    type: "video",
    durationMins: 8,
    description: "Relieve upper back tension and open the chest cavity for deeper, more unrestricted breathing.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/Eml2xnoLpCE?autoplay=1",
    perks: ["Improves Breathing", "Counteracts Desk Slouch", "Elevates Mood"],
    futureBenefits: "Correcting your spinal alignment allows up to 30% more oxygen into the lungs daily, leading to vastly improved cellular energy and halting age-related spinal curve.",
  },
  {
    id: "a7-binaural-focus",
    title: "Binaural Beats for Deep Focus",
    type: "audio",
    durationMins: 45,
    description: "40Hz Gamma wave binaural beats designed to enhance concentration and clear mental fog.",
    conditionTags: ["focus", "brain-fog"],
    url: "https://www.youtube.com/embed/lE6RYpe9IT0?autoplay=1",
    perks: ["Enhances Memory", "Induces Flow State", "Blocks Distractions"],
    futureBenefits: "Listening to Gamma frequencies regularly promotes neuroplasticity, actually forming new neural connections that improve your long-term cognitive agility and memory.",
  },
  {
    id: "v8-nadi-shodhana-vid",
    title: "Alternate Nostril Breathing Tutorial",
    type: "video",
    durationMins: 6,
    description: "Learn the proper hand placement and timing for Nadi Shodhana to balance the left and right brain hemispheres.",
    conditionTags: ["anxiety", "focus"],
    url: "https://www.youtube.com/embed/K-8zKCSJ7hw?autoplay=1",
    perks: ["Balances Hemispheres", "Calms the Heart", "Focuses the Mind"],
    futureBenefits: "Nadi Shodhana harmonizes the sympathetic and parasympathetic nervous systems, offering a permanent upgrade to your emotional regulation and emotional intelligence.",
  },
  {
    id: "a8-forest-walk",
    title: "Himalayan Forest Soundscape",
    type: "audio",
    durationMins: 30,
    description: "Immersive nature sounds featuring birdsong and rustling leaves for nervous system regulation.",
    conditionTags: ["anxiety", "calm"],
    url: "https://www.youtube.com/embed/FjHGZj2IjBg?autoplay=1",
    perks: ["Lowers Cortisol", "Reduces Muscle Tension", "Evokes Peace"],
    futureBenefits: "Daily auditory exposure to nature drastically reduces systemic inflammation and protects against cardiovascular diseases linked to urban stress.",
  },
  {
    id: "v9-yoga-for-digestion",
    title: "Post-Meal Vajrasana & Twists",
    type: "video",
    durationMins: 7,
    description: "Specific postures to perform 30 minutes after eating to aid digestion and prevent acid reflux.",
    conditionTags: ["digestion", "acid"],
    url: "https://www.youtube.com/embed/hJbRpHZr_d0?autoplay=1",
    perks: ["Prevents Acid Reflux", "Aids Nutrient Absorption", "Relieves Gas"],
    futureBenefits: "Incorporating this after heavy meals trains your digestive tract to process complex foods efficiently, virtually eliminating chronic indigestion and lethargy.",
  },
  {
    id: "a9-morning-affirmations",
    title: "Ayurvedic Morning Affirmations",
    type: "audio",
    durationMins: 6,
    description: "Positive energetic affirmations to set a powerful, balanced intention for the day ahead.",
    conditionTags: ["mood", "morning"],
    url: "https://www.youtube.com/embed/2OEl0k_w4sM?autoplay=1",
    perks: ["Elevates Mood", "Boosts Self-Esteem", "Sets Daily Intention"],
    futureBenefits: "Over time, affirmations literally restructure the subconscious mind, replacing deep-seated limiting beliefs with unshakeable confidence and positivity.",
  },
  {
    id: "v10-full-body-restore",
    title: "Full Body Restorative Yin Yoga",
    type: "video",
    durationMins: 30,
    description: "Deep, long-held stretches to release fascia tension and promote deep cellular rest.",
    conditionTags: ["stress", "fatigue"],
    url: "https://www.youtube.com/embed/L_xrDAtykMI?autoplay=1",
    perks: ["Releases Fascia", "Improves Joint Mobility", "Deeply Relaxing"],
    futureBenefits: "Yin yoga maintains the hydration and elasticity of your connective tissues, keeping your joints youthful and completely preventing age-related stiffness.",
  },
  {
    id: "a10-digestion-meditation",
    title: "Mindful Eating Guide",
    type: "audio",
    durationMins: 4,
    description: "Listen to this right before a meal to enter a parasympathetic (rest and digest) state for optimal digestion.",
    conditionTags: ["digestion", "bloating"],
    url: "https://www.youtube.com/embed/bXU2JdJAmc0?autoplay=1",
    perks: ["Activates Digestion", "Prevents Overeating", "Enhances Taste"],
    futureBenefits: "Mindful eating naturally regulates your portion sizes without dieting, leading to effortless weight management and a completely transformed relationship with food.",
  },
  {
    id: "a11-heart-chakra",
    title: "Heart Chakra (Anahata) Tuning",
    type: "audio",
    durationMins: 15,
    description: "Solfeggio frequency 639Hz associated with heart healing, compassion, and releasing emotional blockages.",
    conditionTags: ["mood", "grief"],
    url: "https://www.youtube.com/embed/tgOEPnEud1E?autoplay=1",
    perks: ["Releases Emotional Blocks", "Fosters Empathy", "Deeply Soothing"],
    futureBenefits: "Sound therapy using solfeggio frequencies helps dissolve subconscious trauma, leading to vastly healthier interpersonal relationships and profound self-love.",
  },
  {
    id: "a12-deep-delta",
    title: "Deep Delta Wave Sleep Therapy",
    type: "audio",
    durationMins: 90,
    description: "Low-frequency ambient drones designed to carry you into the deepest stages of restorative sleep.",
    conditionTags: ["sleep", "insomnia"],
    url: "https://www.youtube.com/embed/eKFTSSKCzWA?autoplay=1",
    perks: ["Maximizes REM Sleep", "Prevents Waking Up", "Deep Relaxation"],
    futureBenefits: "Consistent delta-wave entrainment ensures your brain fully cleanses metabolic waste at night, protecting against cognitive decline and Alzheimer's over your lifetime.",
  },
  {
    id: "a13-nadi-shodhana-audio",
    title: "Guided Alternate Nostril Breathing",
    type: "audio",
    durationMins: 10,
    description: "A purely audio-paced guide for Nadi Shodhana. Close your eyes and follow the breath cues.",
    conditionTags: ["anxiety", "balance"],
    url: "https://www.youtube.com/embed/4oB15bQyE20?autoplay=1",
    perks: ["Regulates Heart Rate", "Balances Energy Channels", "Clears the Mind"],
    futureBenefits: "Daily alternate nostril breathing physically strengthens the lungs while balancing the left and right hemispheres of the brain for perfect analytical and creative harmony.",
  },
  {
    id: "a14-bhramari",
    title: "Humming Bee Breath (Bhramari)",
    type: "audio",
    durationMins: 5,
    description: "A calming vibration practice that instantly lowers blood pressure and stops racing thoughts.",
    conditionTags: ["anxiety", "blood-pressure"],
    url: "https://www.youtube.com/embed/h6n22yB0pAE?autoplay=1",
    perks: ["Instantly Stops Panic", "Soothes the Nervous System", "Improves Vocal Tone"],
    futureBenefits: "The internal vibrations of Bhramari naturally stimulate nitric oxide production in the sinuses, keeping your respiratory immune system permanently robust.",
  },
  {
    id: "a15-singing-bowls",
    title: "Tibetan Singing Bowls Bath",
    type: "audio",
    durationMins: 20,
    description: "Acoustic resonance therapy using authentic Tibetan metal bowls to clear stagnant physical energy.",
    conditionTags: ["stress", "fatigue"],
    url: "https://www.youtube.com/embed/R_x0Y7qB2vE?autoplay=1",
    perks: ["Clears Energy Blockages", "Induces Trance State", "Harmonizes Cells"],
    futureBenefits: "Regular sound baths recalibrate the vibrational frequency of your cells, promoting accelerated physical healing and recovery from illness or intense exercise.",
  },
  {
    id: "a16-kapha-activation",
    title: "Upbeat Morning Raga",
    type: "audio",
    durationMins: 12,
    description: "An energizing traditional Indian Raga meant to be played at sunrise to dispel Kapha lethargy.",
    conditionTags: ["energy", "kapha"],
    url: "https://www.youtube.com/embed/B8yH9Kx2kLQ?autoplay=1",
    perks: ["Invigorates the Senses", "Dispels Morning Fog", "Boosts Motivation"],
    futureBenefits: "Waking up to active, major-scale traditional ragas naturally sets your dopamine baseline higher for the day, preventing depressive thought patterns.",
  },
  {
    id: "a17-stress-relief",
    title: "Progressive Muscle Relaxation",
    type: "audio",
    durationMins: 15,
    description: "A guided journey through the body to consciously tense and release hidden muscular stress.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
    perks: ["Identifies Hidden Tension", "Promotes Deep Rest", "Cures Headaches"],
    futureBenefits: "You will develop profound somatic awareness, allowing your body to auto-correct and release tension *before* it turns into chronic pain or migraines.",
  },
  {
    id: "a18-ocean-waves",
    title: "Rhythmic Ocean Waves",
    type: "audio",
    durationMins: 40,
    description: "The natural rhythm of the ocean to help pace your breathing and wash away daily mental clutter.",
    conditionTags: ["calm", "sleep"],
    url: "https://www.youtube.com/embed/1ZYbU82GVz4?autoplay=1",
    perks: ["Paces Breathing", "Evokes Safety", "Aids Meditation"],
    futureBenefits: "Ocean sounds mimic the rhythm of the mother's heartbeat in the womb, providing lifelong psychological anchoring to feelings of absolute safety and security.",
  },
  {
    id: "a19-gratitude",
    title: "Gratitude Reflection",
    type: "audio",
    durationMins: 5,
    description: "A short, uplifting practice to shift your mindset from scarcity to abundance.",
    conditionTags: ["mood", "depression"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
    perks: ["Increases Happiness", "Shifts Perspective", "Enhances Empathy"],
    futureBenefits: "Practicing gratitude fundamentally changes your brain chemistry, drastically increasing natural serotonin production and fortifying your mental health.",
  },
  {
    id: "a20-yoga-nidra-long",
    title: "45-Minute Deep Yoga Nidra",
    type: "audio",
    durationMins: 45,
    description: "An extended yogic sleep journey. Equivalent to 3 hours of deep, conventional sleep for the nervous system.",
    conditionTags: ["fatigue", "burnout"],
    url: "https://www.youtube.com/embed/MCkTebktHVc?autoplay=1",
    perks: ["Cures Burnout", "Repairs Cellular Damage", "Total Mind Reset"],
    futureBenefits: "A lifelong practice of deep Yoga Nidra delays cognitive aging and provides an impenetrable shield against modern chronic burnout and adrenal exhaustion.",
  }
];

export function getRecommendations(checkin?: WellnessCheckin): MediaItem[] {
  if (!checkin) return [];

  const recommendations: MediaItem[] = [];

  // High Stress AND/OR Poor Sleep
  if (checkin.calmness <= 2 || checkin.sleep <= 2) {
    const item = mediaLibrary.find((m) => m.id === "a1-yoga-nidra");
    if (item) recommendations.push(item);
  }

  // Poor Digestion
  if (checkin.digestion <= 2) {
    const item = mediaLibrary.find((m) => m.id === "v2-digestive-yoga");
    if (item) recommendations.push(item);
  }

  // Low Energy
  if (checkin.energy <= 2) {
    const item = mediaLibrary.find((m) => m.id === "v3-kapalbhati");
    if (item) recommendations.push(item);
  }

  // Foggy Mental Clarity or High Anxiety
  if (checkin.mentalClarity <= 2 && checkin.calmness <= 3) {
    const item = mediaLibrary.find((m) => m.id === "a2-grounding");
    if (item && !recommendations.some(r => r.id === item.id)) {
      recommendations.push(item);
    }
  }

  return recommendations;
}
