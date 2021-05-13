export interface ComicStripDTO {
  day: string;
  month: string;
  num: number;
  year: string;
  // eslint-disable-next-line camelcase
  safe_title: string;
  alt: string;
  img: string;
  numTimesViewed?: number;
}
