import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

require('dayjs/locale/es');
dayjs.locale('es');

dayjs.extend(utc);

export function dateFunctionSave(date?: Date | string) {
  return dayjs(date).subtract(5, 'hours').toDate();
}
