import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: any): any {
    if(!value) {
      if(typeof value === 'string') return 'Имя не определено!';
      if(typeof value === 'number') return 'Возраст не определен!';
    }
     
    return value;
  }
}
