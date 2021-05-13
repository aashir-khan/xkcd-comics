import { Dayjs } from 'dayjs';

interface Fields {
  comicNumber: string;
  dateCreated: Dayjs;
  title: string;
  alternativeText: string;
  imageLink: string;
  numTimesViewed?: number;
}

export class ComicStrip {
  comicNumber: string;

  dateCreated: Dayjs;

  title: string;

  alternativeText: string;

  imageLink: string;

  numTimesViewed: number;

  constructor({
    comicNumber,
    dateCreated,
    title,
    alternativeText,
    imageLink,
    numTimesViewed,
  }: Fields) {
    this.comicNumber = comicNumber;
    this.dateCreated = dateCreated;
    this.title = title;
    this.alternativeText = alternativeText;
    this.imageLink = imageLink;
    this.numTimesViewed = numTimesViewed ?? 0;
  }
}
