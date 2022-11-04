export class CurrencyUtils {

    public static isNull(value: any): boolean {
        return value === undefined || value === null || value === '';
    }

    public static toDecimal(input): any {
        if (input === undefined || input === null || input === '') {
            return 0;
        }

        return this.toDecimalInternal(input);
    }

    public static toDecimalNullable(input): any {
        if (input === undefined || input === null || input === '') {
            return null;
        }

        return this.toDecimalInternal(input);
    }

    private static toDecimalInternal(input) {
        input = input.toString().replace(/\./g, '');
        input = input.toString().replace(/\,/g, '.');
        return parseFloat(input);
    }

    public static toPrice(input): any {
        if (input === 0) {
            return '0';
        }

        if (!input) {
            return null;
        }

        let ret = input.toString().replace('R$', '');
        ret = ret.toString().replace(/\,/g, '');
        ret = ret.toString().replace(/\./g, ',');
        if (ret) {
            const decArr = ret.split(',');
            if (decArr.length > 1) {
                const dec = decArr[1].length;
                if (dec === 1) {
                    ret += '0';
                }
            }
        }
        return ret;
    }

    public static round(num, scale = 2) {
        let value: any;
        if (('' + num).includes('e')) {
            const arr = ('' + num).split('e');
            let sig = '';
            if (+arr[1] + scale > 0) {
                sig = '+';
            }

            value = +arr[0] + 'e' + sig + (+arr[1] + scale);
        } else {
            value = num + 'e+' + scale;
        }

        return +(Math.round(value) + 'e-' + scale);
    }

    public static formatRate(value: any,
                             defaultValue: string = null,
                             prefixSign: string = 'R$ ',
                             sufixSign: string = '',
                             decimalLength: number = 4,
                             chunkDelimiter: string = '.',
                             decimalDelimiter: string = ',',
                             chunkLength: number = 3): string {
        let valor = this.format(
            value,
            defaultValue,
            prefixSign,
            sufixSign,
            decimalLength,
            chunkDelimiter,
            decimalDelimiter,
            chunkLength);

        if (decimalLength === 4 && valor.endsWith('00')) {
            valor = valor.slice(0, -2);
        }

        return valor;
    }

    public static format(value: any,
                         defaultValue: string = null,
                         prefixSign: string = 'R$ ',
                         sufixSign: string = '',
                         decimalLength: number = 2,
                         chunkDelimiter: string = '.',
                         decimalDelimiter: string = ',',
                         chunkLength: number = 3): string {
        if (value === undefined || value === null || value === '') {
            return defaultValue == null ? `${prefixSign} - ${sufixSign}` : defaultValue;
        }

        if (typeof value !== 'number') {
            value = this.toDecimal(value);
        }

        const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        const num = value.toFixed(Math.max(0, ~~decimalLength));

        return prefixSign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter) + sufixSign;
    }
}
