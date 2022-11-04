import {Pipe} from '@angular/core';
import {StringUtils} from '../utils';

@Pipe({
    name: 'telefoneFormat'
})
export class TelefoneFormatPipe {
    transform(value: string): string {
        return StringUtils.formatarTelefone(value);
    }
}
