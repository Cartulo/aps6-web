import {Pipe} from '@angular/core';
import {CurrencyUtils} from '../utils';

@Pipe({name: 'currencyFormat'})
export class CurrencyFormat {
    transform(value: any,
              defaultValue: string = null,
              prefixSign: string = 'R$ ',
              sufixSign: string = '',
              decimalLength: number = 2,
              chunkDelimiter: string = '.',
              decimalDelimiter: string = ',',
              chunkLength: number = 3): string {
        return CurrencyUtils.format(value, defaultValue, prefixSign, sufixSign, decimalLength, chunkDelimiter, decimalDelimiter, chunkLength);
    }
}
