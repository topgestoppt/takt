import type { IconName } from '../components/PhosphorIcon';

export type LibraryExercise = {
  name: string;
  group: string;
  kind: string;
  icon: IconName;
};

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  { name: 'Bankdrücken', group: 'Brust', kind: 'Langhantel', icon: 'barbell' },
  { name: 'Schrägbank-Kurzhantel', group: 'Brust', kind: 'Kurzhantel', icon: 'barbell' },
  { name: 'Dips', group: 'Brust', kind: 'Körpergewicht', icon: 'personSimple' },
  { name: 'Klimmzüge', group: 'Rücken', kind: 'Körpergewicht', icon: 'personSimple' },
  { name: 'Langhantelrudern', group: 'Rücken', kind: 'Langhantel', icon: 'barbell' },
  { name: 'Latzug', group: 'Rücken', kind: 'Maschine', icon: 'gear' },
  { name: 'Kniebeuge', group: 'Beine', kind: 'Langhantel', icon: 'barbell' },
  { name: 'Rumänisches Kreuzheben', group: 'Beine', kind: 'Langhantel', icon: 'barbell' },
  { name: 'Beinpresse', group: 'Beine', kind: 'Maschine', icon: 'gear' },
  { name: 'Schulterdrücken', group: 'Schultern', kind: 'Kurzhantel', icon: 'barbell' },
  { name: 'Seitheben', group: 'Schultern', kind: 'Kurzhantel', icon: 'barbell' },
  { name: 'Bizeps-Curls', group: 'Arme', kind: 'Kurzhantel', icon: 'barbell' },
  { name: 'Trizeps-Seildrücken', group: 'Arme', kind: 'Kabel', icon: 'gear' },
  { name: 'Plank', group: 'Core', kind: 'Körpergewicht', icon: 'personSimple' },
  { name: 'Beinheben hängend', group: 'Core', kind: 'Körpergewicht', icon: 'personSimple' },
];

export const MUSCLE_GROUPS = ['Alle', 'Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Core'];

export type PlanExercise = {
  name: string;
  sets: number;
  reps: number;
  kg: number;
};

export const PUSH_A_PLAN: PlanExercise[] = [
  { name: 'Bankdrücken', sets: 4, reps: 8, kg: 72.5 },
  { name: 'Schrägbank-Kurzhantel', sets: 3, reps: 10, kg: 24 },
  { name: 'Schulterdrücken', sets: 3, reps: 10, kg: 30 },
  { name: 'Seitheben', sets: 3, reps: 15, kg: 10 },
  { name: 'Dips', sets: 3, reps: 12, kg: 0 },
  { name: 'Trizeps-Seildrücken', sets: 3, reps: 15, kg: 22.5 },
];

export const TOTAL_PUSH_A_SETS = PUSH_A_PLAN.reduce((a, e) => a + e.sets, 0);

export const WEEK_PLAN: { day: string; short: string }[] = [
  { day: 'Mo', short: 'Push A' },
  { day: 'Di', short: 'Ruhe' },
  { day: 'Mi', short: 'Pull A' },
  { day: 'Do', short: 'Beine' },
  { day: 'Fr', short: 'Push B' },
  { day: 'Sa', short: 'Ruhe' },
  { day: 'So', short: 'Cardio' },
];
