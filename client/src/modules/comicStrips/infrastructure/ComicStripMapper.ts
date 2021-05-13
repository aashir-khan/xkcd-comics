import dayjs from 'dayjs';
import { ComicStrip } from '../domain/ComicStrip';
import { ComicStripDTO } from './ComicStripDTO';
// This mapper maps from ComicStrip entity to ComicStripDTO and vice versa, depending on the scenario
export class ComicStripMapper {
  static toDomain({
    alt,
    day,
    month,
    year,
    img,
    num,
    // eslint-disable-next-line camelcase
    safe_title,
    numTimesViewed,
  }: ComicStripDTO): ComicStrip {
    return new ComicStrip({
      comicNumber: `${num}`,
      alternativeText: alt,
      imageLink: img,
      title: safe_title,
      dateCreated: dayjs()
        .set('date', Number(day))
        .set('month', Number(month))
        .set('year', Number(year)),
      numTimesViewed,
    });
  }

  static toDTO({
    alternativeText,
    dateCreated,
    comicNumber,
    imageLink,
    title,
    numTimesViewed,
  }: ComicStrip): ComicStripDTO {
    return {
      num: Number(comicNumber),
      alt: alternativeText,
      img: imageLink,
      safe_title: title,
      day: `${dateCreated.get('date')}`,
      month: `${dateCreated.get('month')}`,
      year: `${dateCreated.get('year')}`,
      numTimesViewed,
    };
  }
}
