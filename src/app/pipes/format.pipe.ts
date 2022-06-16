import { Pipe, PipeTransform } from '@angular/core';

/* TODO any */
@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  transform<T>(value: T): T | string {
    if (typeof value === 'string' && !value) return 'Имя не определено!';
    if (typeof value === 'number' && !value) return 'Возраст не определен!';

    return value;
  }
}
