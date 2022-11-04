import {SelectList} from './select-list';
import {SelectListItem} from './select-list-item';
import {CheckboxButtonModel} from './checkbox-button.model';
import {RadioButtonModel} from './radio-button.model';

export class SelectType {
    private readonly itens: { label: string; value: any; }[];

    constructor(init?: { label: string; value: any; }[]) {
        this.itens = init || [];
    }

    obterTodos() {
        return this.itens;
    }

    obterLista(select?: (o: any) => SelectListItem): SelectList {
        const list = new SelectList();

        const data = this.obterTodos();

        if (!data || data.length === 0) {
            return list;
        }

        if (select !== undefined && select !== null) {
            list.data.push(...data.map(i => select.call(undefined, i)));
        } else {
            list.data.push(...data.map(i => new SelectListItem(i.value, i.label)));
        }

        return list;
    }

    obterCheckbox(): CheckboxButtonModel[] {
        const list: CheckboxButtonModel[] = [];

        const data = this.obterTodos();

        if (!data || data.length === 0) {
            return list;
        }

        list.push(...data.map(i => new CheckboxButtonModel(i.label, parseInt(i.value))));

        return list;
    }

    obterRadio(): RadioButtonModel[] {
        const list: RadioButtonModel[] = [];

        const data = this.obterTodos();

        if (!data || data.length === 0) {
            return list;
        }

        list.push(...data.map(i => new RadioButtonModel(i.label, i.value)));

        return list;
    }

    obterNome(value: any): string {
        if (!this.itens.some(o => o.value === value)) {
            return 'Valor inválido';
        }

        return this.obterTodos().find(o => o.value === value)?.label;
    }
}
