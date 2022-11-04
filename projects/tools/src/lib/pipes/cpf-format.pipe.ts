import {Pipe} from '@angular/core';
import {StringUtils} from '../utils';

@Pipe({
    name: 'cpfFormat'
})
export class CpfFormatPipe {
    transform(value: string): string {
        return StringUtils.formatarCPF(value);
    }
}
