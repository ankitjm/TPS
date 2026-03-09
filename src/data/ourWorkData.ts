export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string;
}

export interface LogoItem {
  name: string;
  folder: string;
}

// Default data - can be overridden by localStorage
export const defaultVideoData: VideoItem[] = [
  {
    id: '1',
    title: 'Adani Renewables Experience Centre',
    description: 'A full turnkey experience centre at Mundra showcasing renewable energy processes – interiors, hardware, software & content.',
    thumbnail: 'https://img.youtube.com/vi/RjObZz4eHa4/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=RjObZz4eHa4',
    category: 'Renewable Energy Immersion'
  },
  {
    id: '2',
    title: 'Adani Shantigram Experience Centre',
    description: 'A massive interactive phygital table, immersive AV room & interactive sales presenters for a large township.',
    thumbnail: 'https://img.youtube.com/vi/vlLvbJMH9lw/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=vlLvbJMH9lw',
    category: 'Interactive Real Estate Hub'
  },
  {
    id: '3',
    title: 'Century Experience Centre (Bangalore)',
    description: 'Digital Indiranagar map, interactive model, curved screen & immersive AV showcasing the project.',
    thumbnail: 'https://img.youtube.com/vi/OL3ym2aneHE/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OL3ym2aneHE',
    category: 'City Model + Curved Immersion'
  },
  {
    id: '4',
    title: 'Noor Energy Experience Centre',
    description: 'Complete journey of solar energy generation with multiple interactive digital experiences.',
    thumbnail: 'https://img.youtube.com/vi/yn7gZbIwx40/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=yn7gZbIwx40',
    category: 'World\'s Largest Solar Experience'
  },
  {
    id: '5',
    title: 'Prestige Experience Centre',
    description: 'One of India\'s largest experience centres – 165" touch exploration table, transparent touch screen & large LED displays.',
    thumbnail: 'https://img.youtube.com/vi/e4_e5843Ut8/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=e4_e5843Ut8',
    category: 'Mega Touch Exploration'
  },
  {
    id: '6',
    title: 'My Home Experience Centre',
    description: 'An advanced real estate experience centre with multiple digital touchpoints & a 3D AV room.',
    thumbnail: 'https://img.youtube.com/vi/IAlA-2bteKA/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IAlA-2bteKA',
    category: 'State-of-the-Art Commercial Showspace'
  },
  {
    id: '7',
    title: 'Karle Experience Centre',
    description: 'A niche, design-led centre featuring a digital table, AV room & interactive sales presenters.',
    thumbnail: 'https://img.youtube.com/vi/0HcAL-THe_A/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=0HcAL-THe_A',
    category: 'Boutique Interactive Experience'
  },
  {
    id: '8',
    title: 'Assetz Sora & Saki Experience Centre',
    description: 'Retrofitted in 10 days – interactive phygital walls transforming an existing space into an immersive zone.',
    thumbnail: 'https://img.youtube.com/vi/ZuMp4PW8mH0/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=ZuMp4PW8mH0',
    category: 'Rapid Retrofit Phygital Walls'
  }
];

export const defaultLogoData: LogoItem[] = [
  { name: 'Adani Connex', folder: 'adani-connex' },
  { name: 'Adani Realty', folder: 'adani-realty' },
  { name: 'Adani Solar', folder: 'adani-solar' },
  { name: 'Asian Paints', folder: 'asian-paints' },
  { name: 'Assetz', folder: 'assetz' },
  { name: 'Axiscades', folder: 'axiscades' },
  { name: 'Bhartiya', folder: 'bhartiya' },
  { name: 'Bren', folder: 'bren' },
  { name: 'Bricks', folder: 'bricks' },
  { name: 'Century Real Estate', folder: 'century-realestate' },
  { name: 'Deloitte', folder: 'deloitte' },
  { name: 'Embassy', folder: 'embassy' },
  { name: 'Fairlark', folder: 'fairlark' },
  { name: 'GHR', folder: 'ghr' },
  { name: 'Homeland', folder: 'homeland' },
  { name: 'HP', folder: 'hp' },
  { name: 'Karle Town Centre', folder: 'karle-town-centre' },
  { name: 'Kavisha', folder: 'kavisha' },
  { name: 'M3M', folder: 'm3m' },
  { name: 'Maia', folder: 'maia' },
  { name: 'Mehta Group', folder: 'mehta-group' },
  { name: 'Mistral', folder: 'mistral' },
  { name: 'MSN', folder: 'msn' },
  { name: 'My Home', folder: 'myhome' },
  { name: 'Noor Energy', folder: 'noor-energy' },
  { name: 'Pace Digitek', folder: 'pace-digitek' },
  { name: 'Prestige', folder: 'prestige' },
  { name: 'Sattva', folder: 'sattva' },
  { name: 'Shapoorji Pallonji', folder: 'shapoorji-pallonji' },
  { name: 'Skyblue', folder: 'skyblue' },
  { name: 'Studio 34', folder: 'studio-34' },
  { name: 'Sushma', folder: 'sushma' },
  { name: 'Svamitva', folder: 'svamitva' },
  { name: 'Vaishnavi', folder: 'vaishnavi' },
  { name: 'Volvo', folder: 'volvo' },
  { name: 'Wipro', folder: 'wipro' },
];

// Helper functions to load/save data from localStorage
const STORAGE_KEY_VIDEOS = 'phygital_studio_videos';
const STORAGE_KEY_LOGOS = 'phygital_studio_logos';

export const getVideoData = (): VideoItem[] => {
  if (typeof window === 'undefined') return defaultVideoData;
  const stored = localStorage.getItem(STORAGE_KEY_VIDEOS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultVideoData;
    }
  }
  return defaultVideoData;
};

export const getLogoData = (): LogoItem[] => {
  if (typeof window === 'undefined') return defaultLogoData;
  const stored = localStorage.getItem(STORAGE_KEY_LOGOS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultLogoData;
    }
  }
  return defaultLogoData;
};

export const saveVideoData = (data: VideoItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(data));
  }
};

export const saveLogoData = (data: LogoItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_LOGOS, JSON.stringify(data));
  }
};

export const resetToDefaults = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_VIDEOS);
    localStorage.removeItem(STORAGE_KEY_LOGOS);
  }
};

