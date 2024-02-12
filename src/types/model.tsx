export interface Weakness {
    element: string;
    stars: number;
  }
  
  export interface Resistance {
    element: string;
    effectiveness: string;
    stars: number;
    condition: string;
  }
  
  export interface Monster {
    id: number;
    name: string;
    description: string;
    weaknesses?: Weakness[];
    resistances?: Resistance[];
  }