import type { IconName } from '../components/PhosphorIcon';

export type Recipe = {
  name: string;
  kcal: number;
  protein: number;
  time: string;
  icon: IconName;
  ingredients: { name: string; amount: string }[];
};

export const RECIPES: Recipe[] = [
  {
    name: 'Quark-Bowl mit Beeren',
    kcal: 342,
    protein: 38,
    time: '5 Min',
    icon: 'bowlFood',
    ingredients: [
      { name: 'Magerquark', amount: '250 g' },
      { name: 'Blaubeeren', amount: '100 g' },
      { name: 'Haferflocken', amount: '40 g' },
      { name: 'Honig', amount: '1 TL' },
    ],
  },
  {
    name: 'Hähnchen-Reispfanne',
    kcal: 578,
    protein: 52,
    time: '20 Min',
    icon: 'cookingPot',
    ingredients: [
      { name: 'Hähnchenbrust', amount: '180 g' },
      { name: 'Basmatireis', amount: '80 g roh' },
      { name: 'Paprika', amount: '150 g' },
      { name: 'Sojasauce', amount: '2 EL' },
    ],
  },
  {
    name: 'Lachs mit Brokkoli',
    kcal: 465,
    protein: 39,
    time: '25 Min',
    icon: 'fish',
    ingredients: [
      { name: 'Lachsfilet', amount: '150 g' },
      { name: 'Brokkoli', amount: '250 g' },
      { name: 'Kartoffeln', amount: '200 g' },
      { name: 'Olivenöl', amount: '1 EL' },
    ],
  },
  {
    name: 'Protein-Porridge',
    kcal: 396,
    protein: 31,
    time: '8 Min',
    icon: 'bowlSteam',
    ingredients: [
      { name: 'Haferflocken', amount: '60 g' },
      { name: 'Milch 1,5 %', amount: '250 ml' },
      { name: 'Proteinpulver', amount: '25 g' },
      { name: 'Banane', amount: '1/2' },
    ],
  },
];
