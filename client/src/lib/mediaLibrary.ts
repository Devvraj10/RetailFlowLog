import { type WellnessCheckin } from "@shared/schema";

export type MediaType = "audio" | "video";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  durationMins: number;
  description: string;
  conditionTags: string[];
  thumbnailUrl?: string; // Optional for when we have real assets
  url: string; // The URL to the video or audio
}

// Our curated mock database of Ayurvedic media (Shuffled for mixed display)
export const mediaLibrary: MediaItem[] = [
  {
    id: "v1-morning-yoga",
    title: "15-Minute Morning Vinyasa",
    type: "video",
    durationMins: 15,
    description: "A gentle morning flow to awaken the body, build gentle heat, and clear Kapha stagnation.",
    conditionTags: ["energy", "sluggishness", "morning"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1",
  },
  {
    id: "a1-yoga-nidra",
    title: "10-Minute Yoga Nidra for Deep Rest",
    type: "audio",
    durationMins: 10,
    description: "A guided yogic sleep practice to calm the nervous system and prepare the mind for deep, restorative sleep.",
    conditionTags: ["stress", "sleep"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "v2-digestive-yoga",
    title: "Agni Sara: Digestive Fire Asanas",
    type: "video",
    durationMins: 15,
    description: "A sequence of gentle twists and abdominal compressions designed to stimulate Agni (digestive fire) and relieve bloating.",
    conditionTags: ["digestion", "bloating"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
  },
  {
    id: "a2-grounding",
    title: "Grounding Vata Meditation",
    type: "audio",
    durationMins: 8,
    description: "A stabilizing meditation focusing on the root chakra to bring scattered, anxious thoughts back to earth.",
    conditionTags: ["anxiety", "vata"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "v3-kapalbhati",
    title: "Kapalabhati Breathwork (Video Guide)",
    type: "video",
    durationMins: 5,
    description: "Skull-shining breath to clear sluggishness, stimulate digestion, and instantly boost your energy levels.",
    conditionTags: ["energy", "focus"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1",
  },
  {
    id: "a3-rain-sleep",
    title: "Monsoon Rain Sleep Soundscape",
    type: "audio",
    durationMins: 60,
    description: "Continuous soothing rain sounds to mask background noise and induce deep delta-wave sleep.",
    conditionTags: ["sleep", "insomnia"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "v4-evening-wind-down",
    title: "Gentle Evening Stretching",
    type: "video",
    durationMins: 20,
    description: "Slow, restorative stretches to calm the nervous system before bed. Ideal for Vata imbalance.",
    conditionTags: ["sleep", "stress", "vata"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
  },
  {
    id: "a4-om-chanting",
    title: "108 OM Mantra Chanting",
    type: "audio",
    durationMins: 25,
    description: "Resonant OM chanting to center the mind, lower blood pressure, and create a protective energetic field.",
    conditionTags: ["focus", "spiritual"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "v5-pitta-cooling-flow",
    title: "Cooling Lunar Flow (Chandra Namaskar)",
    type: "video",
    durationMins: 12,
    description: "A slow-paced, cooling yoga flow designed to pacify excess Pitta and reduce body heat.",
    conditionTags: ["heat", "irritability", "pitta"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1", 
  },
  {
    id: "a5-5min-reset",
    title: "5-Minute Midday Reset",
    type: "audio",
    durationMins: 5,
    description: "A quick guided body scan to release jaw tension and drop your shoulders during a busy workday.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "v6-kapha-energizing",
    title: "Dynamic Sun Salutations",
    type: "video",
    durationMins: 10,
    description: "Fast-paced Surya Namaskar to break a sweat, stimulate circulation, and clear heavy Kapha energy.",
    conditionTags: ["weight", "sluggishness", "kapha"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
  },
  {
    id: "a6-pitta-cooling",
    title: "Cooling Breath (Sheetali Pranayama)",
    type: "audio",
    durationMins: 5,
    description: "Audio guide for the cooling breath technique. Excellent for hot flashes, anger, or summer heat.",
    conditionTags: ["heat", "anger", "pitta"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "v7-posture-correction",
    title: "Heart-Opening Asanas",
    type: "video",
    durationMins: 8,
    description: "Relieve upper back tension and open the chest cavity for deeper, more unrestricted breathing.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1",
  },
  {
    id: "a7-binaural-focus",
    title: "Binaural Beats for Deep Focus",
    type: "audio",
    durationMins: 45,
    description: "40Hz Gamma wave binaural beats designed to enhance concentration and clear mental fog.",
    conditionTags: ["focus", "brain-fog"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "v8-nadi-shodhana-vid",
    title: "Alternate Nostril Breathing Tutorial",
    type: "video",
    durationMins: 6,
    description: "Learn the proper hand placement and timing for Nadi Shodhana to balance the left and right brain hemispheres.",
    conditionTags: ["anxiety", "focus"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
  },
  {
    id: "a8-forest-walk",
    title: "Himalayan Forest Soundscape",
    type: "audio",
    durationMins: 30,
    description: "Immersive nature sounds featuring birdsong and rustling leaves for nervous system regulation.",
    conditionTags: ["anxiety", "calm"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "v9-yoga-for-digestion",
    title: "Post-Meal Vajrasana & Twists",
    type: "video",
    durationMins: 7,
    description: "Specific postures to perform 30 minutes after eating to aid digestion and prevent acid reflux.",
    conditionTags: ["digestion", "acid"],
    url: "https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1",
  },
  {
    id: "a9-morning-affirmations",
    title: "Ayurvedic Morning Affirmations",
    type: "audio",
    durationMins: 6,
    description: "Positive energetic affirmations to set a powerful, balanced intention for the day ahead.",
    conditionTags: ["mood", "morning"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "v10-full-body-restore",
    title: "Full Body Restorative Yin Yoga",
    type: "video",
    durationMins: 30,
    description: "Deep, long-held stretches to release fascia tension and promote deep cellular rest.",
    conditionTags: ["stress", "fatigue"],
    url: "https://www.youtube.com/embed/v7AYKMP6rOE?autoplay=1",
  },
  {
    id: "a10-digestion-meditation",
    title: "Mindful Eating Guide",
    type: "audio",
    durationMins: 4,
    description: "Listen to this right before a meal to enter a parasympathetic (rest and digest) state for optimal digestion.",
    conditionTags: ["digestion", "bloating"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "a11-heart-chakra",
    title: "Heart Chakra (Anahata) Tuning",
    type: "audio",
    durationMins: 15,
    description: "Solfeggio frequency 639Hz associated with heart healing, compassion, and releasing emotional blockages.",
    conditionTags: ["mood", "grief"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "a12-deep-delta",
    title: "Deep Delta Wave Sleep Therapy",
    type: "audio",
    durationMins: 90,
    description: "Low-frequency ambient drones designed to carry you into the deepest stages of restorative sleep.",
    conditionTags: ["sleep", "insomnia"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "a13-nadi-shodhana-audio",
    title: "Guided Alternate Nostril Breathing",
    type: "audio",
    durationMins: 10,
    description: "A purely audio-paced guide for Nadi Shodhana. Close your eyes and follow the breath cues.",
    conditionTags: ["anxiety", "balance"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "a14-bhramari",
    title: "Humming Bee Breath (Bhramari)",
    type: "audio",
    durationMins: 5,
    description: "A calming vibration practice that instantly lowers blood pressure and stops racing thoughts.",
    conditionTags: ["anxiety", "blood-pressure"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "a15-singing-bowls",
    title: "Tibetan Singing Bowls Bath",
    type: "audio",
    durationMins: 20,
    description: "Acoustic resonance therapy using authentic Tibetan metal bowls to clear stagnant physical energy.",
    conditionTags: ["stress", "fatigue"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "a16-kapha-activation",
    title: "Upbeat Morning Raga",
    type: "audio",
    durationMins: 12,
    description: "An energizing traditional Indian Raga meant to be played at sunrise to dispel Kapha lethargy.",
    conditionTags: ["energy", "kapha"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "a17-stress-relief",
    title: "Progressive Muscle Relaxation",
    type: "audio",
    durationMins: 15,
    description: "A guided journey through the body to consciously tense and release hidden muscular stress.",
    conditionTags: ["stress", "tension"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  },
  {
    id: "a18-ocean-waves",
    title: "Rhythmic Ocean Waves",
    type: "audio",
    durationMins: 40,
    description: "The natural rhythm of the ocean to help pace your breathing and wash away daily mental clutter.",
    conditionTags: ["calm", "sleep"],
    url: "https://www.youtube.com/embed/Wsy2L9VvX90?autoplay=1",
  },
  {
    id: "a19-gratitude",
    title: "Gratitude Reflection",
    type: "audio",
    durationMins: 5,
    description: "A short, uplifting practice to shift your mindset from scarcity to abundance.",
    conditionTags: ["mood", "depression"],
    url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: "a20-yoga-nidra-long",
    title: "45-Minute Deep Yoga Nidra",
    type: "audio",
    durationMins: 45,
    description: "An extended yogic sleep journey. Equivalent to 3 hours of deep, conventional sleep for the nervous system.",
    conditionTags: ["fatigue", "burnout"],
    url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
  }
];

/**
 * Algorithmic Recommendation Engine
 */
export function getRecommendations(checkin?: WellnessCheckin): MediaItem[] {
  if (!checkin) return [];

  const recommendations: MediaItem[] = [];

  // High Stress AND/OR Poor Sleep (Score 1 or 2 out of 5)
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

  // Foggy Mental Clarity or High Anxiety (Vata imbalance)
  if (checkin.mentalClarity <= 2 && checkin.calmness <= 3) {
    const item = mediaLibrary.find((m) => m.id === "a2-grounding");
    if (item && !recommendations.some(r => r.id === item.id)) {
      recommendations.push(item);
    }
  }

  return recommendations;
}
