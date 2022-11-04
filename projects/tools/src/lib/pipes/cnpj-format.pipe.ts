import {Pipe} from '@angular/core';
import {StringUtils} from '../utils';

@Pipe({
    name: 'cnpjFormat'
})
export class CnpjFormatPipe {
    transform(value: string): string {
        return StringUtils.formatarCNPJ(value);
    }
}
