export type Food = {
  name: string;
  portion: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const FOODS: Food[] = [
  { name: 'Haferflocken', portion: '60 g', kcal: 228, protein: 8, carbs: 40, fat: 4 },
  { name: 'Magerquark', portion: '250 g', kcal: 168, protein: 30, carbs: 10, fat: 1 },
  { name: 'Skyr Vanille', portion: '150 g', kcal: 105, protein: 15, carbs: 9, fat: 0 },
  { name: 'Hähnchenbrust', portion: '150 g', kcal: 248, protein: 46, carbs: 0, fat: 5 },
  { name: 'Basmatireis, gekocht', portion: '150 g', kcal: 195, protein: 4, carbs: 42, fat: 0 },
  { name: 'Vollkornbrot', portion: '1 Scheibe', kcal: 97, protein: 4, carbs: 17, fat: 1 },
  { name: 'Banane', portion: '120 g', kcal: 107, protein: 1, carbs: 25, fat: 0 },
  { name: 'Proteinshake', portion: '30 g Pulver', kcal: 118, protein: 24, carbs: 2, fat: 2 },
  { name: 'Lachsfilet', portion: '150 g', kcal: 309, protein: 31, carbs: 0, fat: 20 },
  { name: 'Brokkoli', portion: '200 g', kcal: 68, protein: 6, carbs: 8, fat: 1 },
  { name: 'Rührei', portion: '2 Eier', kcal: 172, protein: 13, carbs: 1, fat: 13 },
  { name: 'Olivenöl', portion: '1 EL', kcal: 108, protein: 0, carbs: 0, fat: 12 },
];

export const SCANNED_PRODUCT: Food = {
  name: 'Skyr Vanille',
  portion: '150 g',
  kcal: 105,
  protein: 15,
  carbs: 9,
  fat: 0,
};
export const SCANNED_EAN = '4260123456789';
