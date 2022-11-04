import {Pipe} from '@angular/core';
import {StringUtils} from '../utils';

@Pipe({
    name: 'cepFormat'
})
export class CepFormatPipe {
    transform(value: string): string {
        return StringUtils.formatarCEP(value);
    }
}
