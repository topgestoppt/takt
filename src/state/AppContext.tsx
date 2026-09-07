import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Food } from '../data/foods';
import { PUSH_A_PLAN } from '../data/exercises';
import type { IconName } from '../components/PhosphorIcon';

export const MEAL_NAMES: { name: MealName; icon: IconName }[] = [
  { name: 'Frühstück', icon: 'coffee' },
  { name: 'Mittag', icon: 'bowlFood' },
  { name: 'Abend', icon: 'cookingPot' },
  { name: 'Snack', icon: 'cookie' },
];

export type MealName = 'Frühstück' | 'Mittag' | 'Abend' | 'Snack';

export type FoodEntry = {
  name: string;
  portion: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: MealName;
};

const INITIAL_ENTRIES: FoodEntry[] = [
  { name: 'Haferflocken', portion: '60 g', kcal: 228, protein: 8, carbs: 40, fat: 4, meal: 'Frühstück' },
  { name: 'Magerquark', portion: '250 g', kcal: 168, protein: 30, carbs: 10, fat: 1, meal: 'Frühstück' },
  { name: 'Banane', portion: '120 g', kcal: 107, protein: 1, carbs: 25, fat: 0, meal: 'Frühstück' },
  { name: 'Hähnchen-Reispfanne', portion: '1 Portion', kcal: 578, protein: 52, carbs: 62, fat: 11, meal: 'Mittag' },
  { name: 'Proteinshake', portion: '30 g Pulver', kcal: 118, protein: 24, carbs: 2, fat: 2, meal: 'Snack' },
];

const BASE_BUDGET = 2140;
const TRAINING_BONUS = 320;
export const GOALS = { protein: 165, carbs: 210, fat: 68 };

const fmt = (n: number) => n.toLocaleString('de-DE');

type AppState = {
  entries: FoodEntry[];
  meal: MealName;
  setMeal: (m: MealName) => void;
  addFoodEntry: (food: Food) => void;
  addRecipeEntry: (recipe: { name: string; kcal: number; protein: number }) => void;

  kgOverrides: Record<number, number>;
  kgOf: (exerciseIndex: number) => number;
  bumpKg: (exerciseIndex: number, delta: number) => void;

  doneSets: Record<string, boolean>;
  toggleSet: (exerciseIndex: number, setIndex: number) => void;
  doneCount: number;

  restSeconds: number;

  workoutDone: boolean;
  finishWorkout: () => void;

  bonusEnabled: boolean;
  setBonusEnabled: (v: boolean) => void;
  notify: boolean;
  setNotify: (v: boolean) => void;
  units: string;
  setUnits: (v: string) => void;

  toast: string;
  flash: (message: string) => void;

  consumed: number;
  budget: number;
  remaining: number;
  bonusOn: boolean;
  pct: number;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<FoodEntry[]>(INITIAL_ENTRIES);
  const [meal, setMeal] = useState<MealName>('Mittag');
  const [kgOverrides, setKgOverrides] = useState<Record<number, number>>({});
  const [doneSets, setDoneSets] = useState<Record<string, boolean>>({});
  const [restSeconds, setRestSeconds] = useState(0);
  const [workoutDone, setWorkoutDone] = useState(false);
  const [bonusEnabled, setBonusEnabled] = useState(true);
  const [notify, setNotify] = useState(true);
  const [units, setUnits] = useState('kg / cm');
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const t = setInterval(() => {
      setRestSeconds((r) => (r > 0 ? r - 1 : r));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const flash = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2400);
  };

  const addFoodEntry = (food: Food) => {
    setEntries((e) => e.concat([{ ...food, meal }]));
    flash(`${food.name} zu ${meal} hinzugefügt`);
  };

  const addRecipeEntry = (recipe: { name: string; kcal: number; protein: number }) => {
    setEntries((e) =>
      e.concat([
        {
          name: recipe.name,
          portion: '1 Portion',
          kcal: recipe.kcal,
          protein: recipe.protein,
          carbs: Math.round(recipe.kcal * 0.11),
          fat: Math.round(recipe.kcal * 0.025),
          meal,
        },
      ])
    );
    flash(`${recipe.name} als ${meal} geloggt`);
  };

  const kgOf = (exerciseIndex: number) =>
    kgOverrides[exerciseIndex] !== undefined ? kgOverrides[exerciseIndex] : PUSH_A_PLAN[exerciseIndex].kg;

  const bumpKg = (exerciseIndex: number, delta: number) => {
    setKgOverrides((prev) => {
      const cur = prev[exerciseIndex] !== undefined ? prev[exerciseIndex] : PUSH_A_PLAN[exerciseIndex].kg;
      return { ...prev, [exerciseIndex]: Math.max(0, Math.round((cur + delta) * 2) / 2) };
    });
  };

  const toggleSet = (exerciseIndex: number, setIndex: number) => {
    const key = `${exerciseIndex}-${setIndex}`;
    const wasOn = !!doneSets[key];
    setDoneSets((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
        return next;
      }
      next[key] = true;
      return next;
    });
    if (!wasOn) setRestSeconds(90);
  };

  const finishWorkout = () => {
    setWorkoutDone(true);
    setRestSeconds(0);
    flash('Workout gespeichert · +320 kcal Trainingsbonus');
  };

  const doneCount = Object.keys(doneSets).length;

  const consumed = entries.reduce((a, e) => a + e.kcal, 0);
  const bonusOn = bonusEnabled && workoutDone;
  const budget = BASE_BUDGET + (bonusOn ? TRAINING_BONUS : 0);
  const remaining = Math.max(0, budget - consumed);
  const pct = Math.min(1, consumed / budget);

  const value = useMemo<AppState>(
    () => ({
      entries,
      meal,
      setMeal,
      addFoodEntry,
      addRecipeEntry,
      kgOverrides,
      kgOf,
      bumpKg,
      doneSets,
      toggleSet,
      doneCount,
      restSeconds,
      workoutDone,
      finishWorkout,
      bonusEnabled,
      setBonusEnabled,
      notify,
      setNotify,
      units,
      setUnits,
      toast,
      flash,
      consumed,
      budget,
      remaining,
      bonusOn,
      pct,
    }),
    [entries, meal, kgOverrides, doneSets, doneCount, restSeconds, workoutDone, bonusEnabled, notify, units, toast, consumed, budget, remaining, bonusOn, pct]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { fmt };
