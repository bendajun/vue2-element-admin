import {
  dateFormat as dateFormatUtil,
} from '@/utils';

export const dateFormat = {
  name: 'dateFormat',
  handler: (date, formatter) => {
    return dateFormatUtil(date, formatter);
  }
}
