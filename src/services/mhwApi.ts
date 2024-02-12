interface Monster {
  id: number;
  name: string;
  description: string;
  type: 'large' | 'small';
}
export const fetchMonsters = async (): Promise<Monster[]> => {
  const response = await fetch('https://mhw-db.com/monsters');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const monsters: Monster[] = await response.json();
  return monsters;
}

export const fetchLargeMonsters = async (): Promise<Monster[]> => {
  const monsters = await fetchMonsters();
  return monsters.filter(monster => monster.type === 'large');
}

export const fetchSmallMonsters = async (): Promise<Monster[]> => {
  const monsters = await fetchMonsters();
  return monsters.filter(monster => monster.type === 'small');
}
