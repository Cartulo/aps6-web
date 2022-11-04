import {Pipe} from '@angular/core';

@Pipe({
    name: 'booleanFormat'
})
export class BooleanFormatPipe {
    transform(value: boolean): string {
        return value ? 'Sim' : 'Não';
    }
}
