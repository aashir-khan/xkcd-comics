import { Dayjs } from 'dayjs';

interface Fields {
  comicNumber: string;
  dateCreated: Dayjs;
  title: string;
  alternativeText: string;
  imageLink: string;
}

export class ComicStrip {
  comicNumber: string;

  dateCreated: Dayjs;

  title: string;

  alternativeText: string;

  imageLink: string;

  constructor({
    comicNumber,
    dateCreated,
    title,
    alternativeText,
    imageLink,
  }: Fields) {
    this.comicNumber = comicNumber;
    this.dateCreated = dateCreated;
    this.title = title;
    this.alternativeText = alternativeText;
    this.imageLink = imageLink;
  }
}
