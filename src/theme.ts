// Nocturne design tokens, ported from _ds/nocturne-.../styles.css

export const color = {
  bg: '#161826',
  surface: '#232532',
  text: '#e9e9ed',
  textMuted: 'rgba(233,233,237,0.55)',
  accent: '#9184d9',
  divider: 'rgba(233,233,237,0.16)',

  neutral100: '#f3f5fe',
  neutral200: '#e4e7f5',
  neutral300: '#cfd3e5',
  neutral400: '#b2b6ca',
  neutral500: '#9397ab',
  neutral600: '#75798c',
  neutral700: '#595d6c',
  neutral800: '#3f424d',
  neutral900: '#292b31',

  accent100: '#f5f4ff',
  accent200: '#e7e5fe',
  accent300: '#d2cefd',
  accent400: '#b5abfc',
  accent500: '#968ae0',
  accent600: '#796cbf',
  accent700: '#5d5294',
  accent800: '#423a6a',
  accent900: '#2b2741',
};

// shadow-sm/md are a hairline edge on this dark ground; RN has no
// multi-layer box-shadow so we approximate with a 1px border.
export const elevation = {
  sm: { borderWidth: 1, borderColor: color.neutral800 },
  md: { borderWidth: 1, borderColor: color.neutral700 },
  lg: { borderWidth: 1, borderColor: color.neutral500 },
};

export const space = {
  1: 2.8,
  2: 5.6,
  3: 8.4,
  4: 11.2,
  6: 16.8,
  8: 22.4,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 14,
};

export const font = {
  heading: 'Inter_500Medium',
  headingSemibold: 'Inter_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
};

export const chipTone = (active: boolean) =>
  active
    ? { bg: color.accent900, border: color.accent700, color: color.accent300 }
    : { bg: 'transparent', border: color.neutral800, color: color.neutral500 };
