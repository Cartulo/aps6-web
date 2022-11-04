// import {DateUtils} from './date-utils';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';

export class ExcelUtils {
    public static getFile(evt: any) {
        const target: DataTransfer = <DataTransfer> (evt.target);
        if (target.files.length !== 1) {
            throw new Error('Não é possível carregar vários arquivos.');
        }
        ;

        return target.files[0];
    }

    public static getJson(e: any): any {
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, {type: 'binary'});

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = this.toJsonWorkbook(workbook);
        const jsonString = JSON.stringify(jsonData[sheetName]);

        return JSON.parse(jsonString, this.reviver);
    }

    public static export(dataJson: any, fileName: string): void {
        const sheet = XLSX.utils.json_to_sheet(dataJson);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, 'Dados');

        const options: XLSX.WritingOptions = {bookType: 'xlsx', type: 'binary'};
        const output = XLSX.write(workbook, options);

        saveAs(new Blob([this.s2ab(output)]), `${fileName}_${this.formatToFile(new Date())}.xlsx`);
    }

    private static formatToFile(date: Date): string {
        if (date == null || date === undefined) {
            return null;
        }

        return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}`;
    }

    private static toJsonWorkbook(workbook) {
        const result = {};
        workbook.SheetNames.forEach(sheetName => {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }

    private static reviver(key, val) {
        if (val instanceof Object) {
            return val;
        }

        if (key) {
            this[key
                .toLowerCase()
                .replace(/[&\/\-._ ]/g, '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')] = val;
        } else {
            return val;
        }
    }

    private static s2ab(s: string): ArrayBuffer {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
}
