import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comaSeperator',
})
export class ComaSeperatorPipe implements PipeTransform {
  transform(value: number, ...args: string[]): any {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
