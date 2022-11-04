import {Pipe} from '@angular/core';
import {CurrencyUtils} from '../utils';

@Pipe({name: 'currencyRateFormat'})
export class CurrencyRateFormat {
    transform(value: any,
              defaultValue: string = null,
              prefixSign: string = 'R$ ',
              sufixSign: string = '',
              decimalLength: number = 4,
              chunkDelimiter: string = '.',
              decimalDelimiter: string = ',',
              chunkLength: number = 3): string {
        return CurrencyUtils.formatRate(value, defaultValue, prefixSign, sufixSign, decimalLength, chunkDelimiter, decimalDelimiter, chunkLength);
    }
}
