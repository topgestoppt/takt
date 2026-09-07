import React from 'react';
import {
  ArrowLeftIcon,
  BarbellIcon,
  BarcodeIcon,
  BooksIcon,
  BowlFoodIcon,
  BowlSteamIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChartLineUpIcon,
  CheckIcon,
  CheckCircleIcon,
  CoffeeIcon,
  CookieIcon,
  CookingPotIcon,
  EqualsIcon,
  FishIcon,
  ForkKnifeIcon,
  GearIcon,
  HouseIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PersonSimpleIcon,
  PlusIcon,
  TimerIcon,
  TrendDownIcon,
  TrendUpIcon,
  UserIcon,
  XIcon,
  type Icon,
} from 'phosphor-react-native';

const ICONS = {
  arrowLeft: ArrowLeftIcon,
  barbell: BarbellIcon,
  barcode: BarcodeIcon,
  books: BooksIcon,
  bowlFood: BowlFoodIcon,
  bowlSteam: BowlSteamIcon,
  caretDown: CaretDownIcon,
  caretRight: CaretRightIcon,
  caretUp: CaretUpIcon,
  chartLineUp: ChartLineUpIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  coffee: CoffeeIcon,
  cookie: CookieIcon,
  cookingPot: CookingPotIcon,
  equals: EqualsIcon,
  fish: FishIcon,
  forkKnife: ForkKnifeIcon,
  gear: GearIcon,
  house: HouseIcon,
  lightning: LightningIcon,
  magnifyingGlass: MagnifyingGlassIcon,
  pencilSimple: PencilSimpleIcon,
  personSimple: PersonSimpleIcon,
  plus: PlusIcon,
  timer: TimerIcon,
  trendDown: TrendDownIcon,
  trendUp: TrendUpIcon,
  user: UserIcon,
  x: XIcon,
} satisfies Record<string, Icon>;

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  weight?: 'regular' | 'fill';
};

export function PhosphorIcon({ name, size = 18, color = '#e9e9ed', weight = 'regular' }: Props) {
  const Cmp = ICONS[name];
  return <Cmp size={size} color={color} weight={weight} />;
}
