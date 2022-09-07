import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true // 'false' trigger onupdate 'true' to not trigger it everytime there is changes
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if ( value.length === 0 || filterString == "" ) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
