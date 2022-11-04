import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {Observable, Subscription} from 'rxjs';
import {MessageService} from 'primeng/api';
import {UtilService} from '../services/util.service';
import {PageReactiveAbstract} from './page-reactive.abstract';
import {PagedData} from '../models';

@Component({template: ''})
export abstract class PageListAbstract<T> extends PageReactiveAbstract implements OnInit {
    private subscription: Subscription;

    protected constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder,
        public utilService: UtilService) {
        super(messageService, formBuilder);
    }

    protected invokeComplete?: () => void;

    ngOnInit(): void {
        this.utilService.paginacao.init();

        if (this.invokeComplete === undefined || this.invokeComplete === null) {
            this.invokeComplete = () => {
                this.utilService.paginacao.desbloquear();
            };
        }
    }

    updateGrid(complete?: () => void): void {
        this.invoke(this.dataMethod(), null, null, complete);
    }

    protected abstract dataMethod(): Observable<PagedData<T>>;

    protected invoke(
        method: Observable<PagedData<T>>,
        next?: (value: PagedData<T>) => void,
        error?: (value: any) => void,
        complete?: () => void): void {

        this.clearErrors();
        this.utilService.paginacao.bloquear();

        this.subscription = method.subscribe(
            resultOk => {
                if (next === undefined || next === null) {
                    next = (value: PagedData<T>) => {
                        this.utilService.paginacao.carregarDados(value);
                    };
                }

                next.call(undefined, resultOk);
            },
            resultError => {
                if (error === undefined || error === null) {
                    error = async (value: any) => {
                        await this.onServerFailed(value);
                        this.utilService.paginacao.desbloquear();
                    };
                }

                error.call(undefined, resultError);
            },
            () => {
                if (complete === undefined || complete === null) {
                    complete = this.invokeComplete;
                }

                complete.call(undefined);
            }
        );
    }

    onClickAtualizar(): void {
        this.updateGrid();
    }

    onChangePagedLimits(dt: any): void {
        dt.reset();
    }

    onLazyLoad(event): void {
        this.utilService.paginacao.alterarPagina(event.first);
        this.updateGrid();
    }

    onDebounceFiltroGeral(): void {
        this.utilService.paginacao.zerarPaginacao();
        this.updateGrid();
    }

    onChangeDatas(event): void {
        this.utilService.filtro.dataInicial = event[0];
        this.utilService.filtro.dataFinal = event[1];
        this.utilService.paginacao.zerarPaginacao();
        this.updateGrid();
    }
}
