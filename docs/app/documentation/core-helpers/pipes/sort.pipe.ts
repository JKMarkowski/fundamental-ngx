import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class SortPipe implements PipeTransform {

    transform(array: any[], orderKey: string): any[] {
        if (!array || array.length == 0) return [];

        array.sort((el1, el2) => {
            if (el1[orderKey] < el2[orderKey]) {
                return -1;
            }

            if (el1[orderKey] > el2[orderKey]) {
                return 1;
            }
            return 0;
        });

        return array;
    }
}
