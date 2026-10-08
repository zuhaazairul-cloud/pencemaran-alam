export type RegionId = 'balai' | 'perak' | 'melaka' | 'sabah' | 'krisis_akhir';

export type Gender = 'LELAKI' | 'PEREMPUAN';

export interface PlayerCustomization {
  name: string;
  gender: Gender;
  skinColor: string;
  outfitColor: string;
  accentColor: string;
  headgearStyle: 'tanjak' | 'semutar' | 'selendang' | 'mahkota';
  weaponType: 'keris_alam' | 'penyembur_eko' | 'tongkat_buluh';
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  type: 'resource' | 'cure' | 'tool' | 'upgrade';
}

export interface EnvironmentalScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  options: {
    label: string;
    actionDescription: string;
    isOptimal: boolean;
    explanation: string;
    ecoScore: number;
    toxicityChange: number;
  }[];
}

export interface Monster3D {
  id: string;
  name: string;
  type: 'lumpur' | 'asapra' | 'plastikara' | 'raja_polusi';
  x: number;
  z: number;
  hp: number;
  maxHp: number;
  isAggro: boolean;
  attackRange: number;
  damage: number;
  speed: number;
}

export interface Collectible3D {
  id: string;
  name: string;
  type: 'plastic' | 'sludge' | 'herb' | 'trash' | 'filter_part';
  x: number;
  z: number;
  collected: boolean;
}

export interface RegionObjective {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  completed: boolean;
}

export interface RegionData {
  id: RegionId;
  name: string;
  subtitle: string;
  pollutionType: string;
  description: string;
  fogColor: string;
  groundColor: string;
  waterColor: string;
  skyColor: string;
  objectives: RegionObjective[];
  bossName: string;
  bossType: 'lumpur' | 'asapra' | 'plastikara' | 'raja_polusi';
}
