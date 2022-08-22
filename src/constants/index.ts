export const PAGE_NAMES = {
  Main: 'Main',
  Sido: 'Sido',
  Station: 'Station',
  Favorite: 'Favorite',
} as const;

export type PAGE_NAMES_TYPE = typeof PAGE_NAMES[keyof typeof PAGE_NAMES];
