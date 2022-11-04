import {Component, EventEmitter, Input, Output} from '@angular/core';

import {PageReactiveAbstract} from './page-reactive.abstract';
import {MessageService} from 'primeng/api';
import {FormBuilder} from '@angular/forms';

@Component({template: ''})
export abstract class ModalBaseComponent extends PageReactiveAbstract {
    public static genericInputs: string[] = ['exibir'];
    public static genericOutputs: string[] = ['exibirEvent', 'salvarEvent', 'cancelarEvent'];

    @Input() exibir: boolean;
    @Output() exibirEvent = new EventEmitter<boolean>();
    @Output() salvarEvent = new EventEmitter<any>();
    @Output() cancelarEvent = new EventEmitter();

    protected constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder) {
        super(messageService, formBuilder);
    }

    notificarOk(resultado: any) {
        this.salvarEvent.emit(resultado);
        this.onHide();
    }

    notificarCancelar() {
        this.cancelarEvent.emit();
        this.onHide();
    }

    onHide() {
        this.exibir = false;
        this.exibirEvent.emit(this.exibir);
    }
}
