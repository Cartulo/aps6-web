import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectList, SelectListItem} from '../models';
import {StringUtils} from '../utils';

@Component({template: ''})
export abstract class SelectListBaseAbstract {
    public static genericInputs: string[] = ['dataSource', 'disabled', 'displayNew', 'label', 'selected', 'textSelected', 'atualizarValores', 'visualizarLista'];
    public static genericOutputs: string[] = ['onSelected', 'onChangeValues'];

    @Input() dataSource: SelectList;
    @Input() disabled = false;
    @Input() displayNew = true;
    @Input() label = '';
    @Input() selected = '';
    @Input() textSelected = '';
    @Input() visualizarLista = false;

    @Input() set atualizarValores(value) {
        if (value) {
            this.dataMethod();
        }
    }

    @Output() onSelected = new EventEmitter<SelectListItem>();
    @Output() onChangeValues = new EventEmitter();

    abstract dataMethod();

    definirLabelPadrao(label: string) {
        if (StringUtils.isNullOrEmpty(this.label)) {
            this.label = label;
        }
    }

    notificarOnSelected(item: SelectListItem) {
        this.onSelected.emit(item);
    }

    notificarOnChangeValues() {
        this.onChangeValues.emit();
    }
}
