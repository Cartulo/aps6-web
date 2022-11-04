import {Pipe} from '@angular/core';
import {StringUtils} from '../utils';

@Pipe({
    name: 'stringFormat'
})
export class StringFormatPipe {
    transform(value: string, valueDefault: string = '-'): string {
        return StringUtils.isNullOrEmpty(value) ? valueDefault : value;
    }
}
