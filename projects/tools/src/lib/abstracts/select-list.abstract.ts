import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

import {Subscription} from 'rxjs';
import {AutoUnsubscribe, StringUtils} from '../utils';
import {SelectList, SelectListItem} from '../models';

@AutoUnsubscribe()
@Component({template: ''})
export abstract class SelectListAbstract implements OnInit, OnChanges {
    public static genericInputs: string[] = ['disabled', 'displayNew', 'label', 'selected', 'textSelected', 'atualizarValores'];
    public static genericOutputs: string[] = ['onSelected', 'onChangeValues'];

    @Input() disabled = false;
    @Input() displayNew = true;
    @Input() label = '';
    @Input() selected = '';
    @Input() textSelected = '';
    @Output() onSelected = new EventEmitter<SelectListItem>();
    @Output() onChangeValues = new EventEmitter();
    inscricaoInit: Subscription;
    lista: SelectList;
    itens: SelectListItem[] = [];
    itensBusca: SelectListItem[] = [];
    itensFiltrados: SelectListItem[] = [];
    ativo: SelectListItem;
    ativoId: string;
    exibir = false;
    filtroEspecifico = false;
    notificado = false;

    @Input() set atualizarValores(value) {
        if (value) {
            this.dataMethod();
        }
    }

    abstract dataMethod();

    abstract searchSpecific(item: SelectListItem, query: string): boolean;

    ngOnInit(): void {
        this.dataMethod();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const changedProp = changes[propName];
                if (!changedProp.firstChange && (propName === 'selected' || propName === 'textSelected')) {
                    this.atualizarAtivo(changedProp.currentValue);
                    this.definirAtivo();
                }
            }
        }
    }

    carregarDados(lista: SelectList) {
        this.lista = lista;
        this.definirAtivo();

        this.itens = this.lista.data.filter(item => !item.deleted || item.id === this.ativoId);

        this.itensBusca = this.lista.data.filter(item => !item.deleted || item.id === this.ativoId).map(x => Object.assign({}, x));
        this.itensBusca.forEach(item => item.text = (StringUtils.removeAccent(item.text) || '').toUpperCase());

        this.atualizarValores = false;
        this.onChangeValues.emit();
    }

    definirLabelPadrao(label: string) {
        if (StringUtils.isNullOrEmpty(this.label)) {
            this.label = label;
        }
    }

    onChange(selecionado: any) {
        this.atualizarAtivo(this.obterItemPorId(selecionado.value.id));
        this.notificar(this.ativo);
    }

    onSelect(selecionado: SelectListItem) {
        this.atualizarAtivo(this.obterItemPorId(selecionado.id));
        this.notificar(this.ativo);
    }

    onClick() {
        this.atualizarAtivo(this.obterItemPorId(this.ativoId));
        this.notificar(this.ativo);
    }

    onClickRemoverAtivo() {
        this.atualizarAtivo();
        this.notificar(this.ativo);
        event.preventDefault();
    }

    onCompleteMethod(event) {
        let query = StringUtils.removeAccent(event.query.toUpperCase());
        query = StringUtils.removerSpecialCharacters(query, /[&\/\-._()]/g);

        const ids = this.itensBusca.filter(item => this.filtrar(item, query)).map(item => item.id);
        this.itensFiltrados = this.lista.data.filter(item => ids.includes(item.id));
    }

    filtrar(item: SelectListItem, query: string): boolean {
        if (this.filtroEspecifico) {
            return item.text.includes(query) || this.searchSpecific(item, query);
        }

        return item.text.includes(query);
    }

    onBlur(evento) {
        setTimeout(() => {
            if (!this.notificado) {
                if (!(this.ativo instanceof Object)) {
                    // if (!(this.ativo instanceof Object) && evento.relatedTarget) {
                    this.atualizarAtivo();
                    this.notificar(this.ativo);
                }
            }

            this.notificado = false;
        }, 300);
    }

    onClickNovo() {
        this.exibir = true;
        event.preventDefault();
    }

    exibirEvent(evento) {
        this.exibir = evento;
    }

    definirAtivo() {
        if (StringUtils.isValidGuid(this.selected)) {
            this.atualizarAtivo(this.obterItemPorId(this.selected));
            this.notificar(this.ativo);
        }
        if (!StringUtils.isNullOrEmpty(this.textSelected)) {
            this.atualizarAtivo(this.obterItemPorNome(this.textSelected));
            this.notificar(this.ativo);
        }
    }

    private obterItemPorId(id: string): SelectListItem {
        return this.lista && this.lista.data ? this.lista.data.find(o => o.id === id) : null;
    }

    private obterItemPorNome(nome: string): SelectListItem {
        return this.lista && this.lista.data ? this.lista.data.find(o => o.text === nome) : null;
    }

    private atualizarAtivo(item?: SelectListItem) {
        if (item) {
            this.ativo = item;
            this.ativoId = item.id;
        } else {
            this.ativo = new SelectListItem(null, null);
            this.ativoId = null;
        }
    }

    private notificar(item: SelectListItem) {
        this.onSelected.emit(item);
        this.notificado = true;
    }
}
