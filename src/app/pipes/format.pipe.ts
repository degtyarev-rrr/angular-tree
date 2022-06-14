import { Pipe, PipeTransform } from '@angular/core';

/* TODO any */
@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  transform<T>(value: T): T | string {
    if (!value) {
      if (typeof value === 'string') return 'Имя не определено!';
      if (typeof value === 'number') return 'Возраст не определен!';
    }

    return value;
  }
}
