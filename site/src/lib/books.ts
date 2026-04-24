import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BookEntry = CollectionEntry<'books'>;

export const byFirstPublishedAsc = (a: BookEntry, b: BookEntry) =>
  a.data.firstPublished.getTime() - b.data.firstPublished.getTime();

export const byFirstPublishedDesc = (a: BookEntry, b: BookEntry) =>
  b.data.firstPublished.getTime() - a.data.firstPublished.getTime();

export const bySeriesOrder = (a: BookEntry, b: BookEntry) => {
  const orderA = a.data.seriesOrder;
  const orderB = b.data.seriesOrder;

  if (typeof orderA === 'number' && typeof orderB === 'number') return orderA - orderB;
  if (typeof orderA === 'number') return -1;
  if (typeof orderB === 'number') return 1;
  return byFirstPublishedAsc(a, b);
};

export const getPublishedBooks = () => getCollection('books', (book) => !book.data.draft);

export function groupBooksByReadYear(books: BookEntry[]) {
  const byYear = new Map<number, BookEntry[]>();

  for (const book of books) {
    const year = book.data.readAtYear;
    if (typeof year !== 'number') continue;
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(book);
  }

  for (const yearBooks of byYear.values()) {
    yearBooks.sort(byFirstPublishedAsc);
  }

  return byYear;
}

export function getReadYearEntries(books: BookEntry[], direction: 'asc' | 'desc' = 'desc') {
  const entries = [...groupBooksByReadYear(books).entries()];
  return entries.sort((a, b) => direction === 'asc' ? a[0] - b[0] : b[0] - a[0]);
}

export function groupBooksByTheme(books: BookEntry[]) {
  const byTheme = new Map<string, BookEntry[]>();

  for (const book of books) {
    for (const theme of book.data.themes) {
      if (!byTheme.has(theme)) byTheme.set(theme, []);
      byTheme.get(theme)!.push(book);
    }
  }

  return byTheme;
}

export function groupBooksBySeries(books: BookEntry[]) {
  const bySeries = new Map<string, BookEntry[]>();

  for (const book of books) {
    const series = book.data.series;
    if (!series) continue;
    if (!bySeries.has(series)) bySeries.set(series, []);
    bySeries.get(series)!.push(book);
  }

  for (const seriesBooks of bySeries.values()) {
    seriesBooks.sort(bySeriesOrder);
  }

  return bySeries;
}
