import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UpperPipe implements PipeTransform {

  transform(value: string, ...args: any): any {

    let header = value[0].toUpperCase() + value.slice(1);
    
    return header;
  }

}
