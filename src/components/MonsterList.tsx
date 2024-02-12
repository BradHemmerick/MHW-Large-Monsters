import React, { useState, useEffect } from 'react';
import { fetchLargeMonsters } from '../services/mhwApi';
import ModalComponent from './ModalComponent';

interface Location {
  name: string;
}

interface Weakness {
  element: string;
  stars: number;
  condition: null | string;
}

interface Monster {
  id: number;
  name: string;
  description: string;
  type: string;
  species?: string; 
  elements?: string[]; 
  ailments?: any[]; 
  locations?: Location[]; 
  resistances?: any[]; 
  weaknesses?: Weakness[]; 
  rewards?: any[]; 
}

const extraMonsterData: Monster = {
  "id": 999,
  "type": "large",
  "species": "elder dragon",
  "elements": [],
  "name": "Fatalis",
  "description": "Fatalis is extremely hostile to all living things. It threatens the very existence of not only the Castle Schrade, but the very world around it. In legend, it is said a Fatalis could scorch the whole world with its flames in a few days, burning all lands to a crisp. Due to this, the Guild will secretly send hunters to hunt it down to prevent public panic. However, most hunters never return. Due to many incidents surrounding Schrade Kingdom and Fatalis, the Hunter's Guild has classified everything about both away from the public.",
  "ailments": [],
  "locations": [{ "name": "Castle Schrade" }],
  "resistances": [],
  "weaknesses": [
    { "element": "fire", "stars": 2, "condition": null },
    { "element": "water", "stars": 1, "condition": null },
    { "element": "thunder", "stars": 1, "condition": null },
    { "element": "ice", "stars": 1, "condition": null },
    { "element": "dragon", "stars": 3, "condition": null },
    { "element": "poison", "stars": 2, "condition": null },
    { "element": "sleep", "stars": 2, "condition": null },
    { "element": "paralysis", "stars": 2, "condition": null },
    { "element": "blast", "stars": 2, "condition": null },
    { "element": "stun", "stars": 0, "condition": null }
  ],
  "rewards": []
};

const MonsterList: React.FC = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);


  useEffect(() => {
    fetchLargeMonsters().then(fetchedMonsters => {
      setMonsters([...fetchedMonsters, extraMonsterData]);
    }).catch(console.error);
  }, []);

  const getImagePath = (name: string): string => {
    const imageName = name.replace(/\s+/g, '').replace(/'/g, '');
    // console.log(imageName)
    return `/monsters-large/${imageName}.png`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">Monsters</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-4">
        {monsters.map((monster) => (
          <div key={monster.id} className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
               onClick={() => setSelectedMonster(monster)}>
            <img
              src={getImagePath(monster.name)}
              alt={monster.name}
              className="w-full object-cover" style={{ height: "256px" }}
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{monster.name}</h2>
              <p className="text-gray-600 text-sm">{monster.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMonster && (
        <ModalComponent isOpen={Boolean(selectedMonster)} onClose={() => setSelectedMonster(null)} monster={selectedMonster}>
          <h2 className="text-2xl font-bold">{selectedMonster.name}</h2>
          <p>{selectedMonster.description}</p>
        </ModalComponent>
      )}
    </div>
  );
};

export default MonsterList;
