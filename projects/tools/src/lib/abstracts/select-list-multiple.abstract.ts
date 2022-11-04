import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Subscription} from 'rxjs';
import {AutoUnsubscribe, StringUtils} from '../utils';
import {SelectList, SelectListItem} from '../models';

@AutoUnsubscribe()
@Component({template: ''})
export abstract class SelectListMultipleBaseAbstract implements OnInit {
    @Input() licencaId: string = null;
    @Input() dataSource: SelectList;
    @Input() disabled = false;
    @Input() displayInList: false;
    @Input() label = '';
    @Input() selected: string[] = [];
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSelected = new EventEmitter<SelectListItem[]>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onChangeValues = new EventEmitter();

    inscricaoInit: Subscription;

    abstract carregarPermissoes(): void;

    abstract carregarDados(): void;

    ngOnInit(): void {
        this.carregarPermissoes();
        this.carregarDados();
    }

    definirLabelPadrao(label: string): void {
        if (StringUtils.isNullOrEmpty(this.label)) {
            this.label = label;
        }
    }

    notificarOnSelected(items: SelectListItem[]): void {
        this.onSelected.emit(items);
    }

    notificarOnChangeValues(): void {
        this.onChangeValues.emit();
    }
}
