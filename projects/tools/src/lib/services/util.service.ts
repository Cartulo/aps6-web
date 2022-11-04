import {Injectable} from '@angular/core';

import {SelectItem} from 'primeng/api';
import {ArraySearch, PagedData} from '../models';

@Injectable({providedIn: 'root'})
export class UtilService {
    filtro: Filtro;
    paginacao: Paginacao;

    constructor() {
        this.filtro = {
            exibir: false,
            texto: null,
            dataInicial: null,
            dataFinal: null,
            dataPrevisaoCaixaInicial: null,
            dataPrevisaoCaixaFinal: null,
            dataCompraInicial: null,
            dataCompraFinal: null,
            dataReceitaInicial: null,
            dataReceitaFinal: null,
            status: null,
            statusList: {none: false, data: []},
            cadastroTipo: null,
            cadastroList: {none: false, data: []},
            sexoTipo: null,
            sexosList: {none: false, data: []},
            representantesList: {none: false, data: []},
            pendenciaRepresentante: false,
            quantidadeCaracteres: null,
            modeloConteudo: null,
            representanteId: null,
            representanteNome: null,
            representanteAtendenteId: null,
            representanteAtendenteNome: null,
            descricaoCurta: null,
            descricaoLonga: null,
            produtosList: {none: false, data: []},
            atendentesList: {none: false, data: []},
            tiposList: {none: false, data: []},
            busList: {none: false, data: []},
            areasList: {none: false, data: []},
            moedasList: {none: false, data: []},
            contas: {none: false, data: []}
        };

        this.paginacao = {
            limites: [
                {label: '10', value: 10},
                {label: '25', value: 25},
                {label: '100', value: 100},
                {label: '500', value: 500}
            ],
            limite: 10,
            offset: 0,
            pagina: 0,
            totalRegistros: 0,
            dados: [],
            loading: false,
            init(): void {
                this.bloquear();
                this.atualizarPagina();
                this.dados = [];
                this.totalRegistros = 0;
            },
            alterarPagina(primeiroRegistro: any): void {
                this.offset = 0;
                if (primeiroRegistro > 0) {
                    this.offset = primeiroRegistro / this.limite;
                }

                this.atualizarPagina();
            },
            atualizarPagina(): void {
                this.pagina = this.offset * this.limite;
            },
            zerarPaginacao(): void {
                this.pagina = 0;
                this.offset = 0;
            },
            carregarDados(dados: PagedData<any>): void {
                this.dados = dados.data;
                this.totalRegistros = dados.totalElements;
            },
            bloquear(): void {
                this.loading = true;
            },
            desbloquear(): void {
                this.loading = false;
            }
        };
    }
}

export interface Filtro {
    exibir: boolean;
    texto: string;
    dataInicial: Date;
    dataFinal: Date;
    dataPrevisaoCaixaInicial: Date;
    dataPrevisaoCaixaFinal: Date;
    dataCompraInicial: Date;
    dataCompraFinal: Date;
    dataReceitaInicial: Date;
    dataReceitaFinal: Date;
    status: number;
    statusList: ArraySearch<any>;
    cadastroTipo: number;
    cadastroList: ArraySearch<any>;
    sexoTipo: number;
    sexosList: ArraySearch<any>;
    representantesList: ArraySearch<any>;
    pendenciaRepresentante: boolean;
    quantidadeCaracteres: number;
    modeloConteudo: number;
    descricaoCurta: string;
    descricaoLonga: string;
    produtosList: ArraySearch<any>;
    atendentesList: ArraySearch<any>;
    representanteId: string,
    representanteNome: string;
    representanteAtendenteId: string;
    representanteAtendenteNome: string;
    tiposList: ArraySearch<any>;
    busList: ArraySearch<any>;
    areasList: ArraySearch<any>;
    moedasList: ArraySearch<any>;
    contas: ArraySearch<string>;
}

export interface Paginacao {
    limites: SelectItem[];
    limite: number;
    offset: number;
    pagina: number;
    totalRegistros: number;
    dados: any[];
    loading: boolean;

    init(): void;

    alterarPagina(primeiroRegistro): void;

    atualizarPagina(): void;

    zerarPaginacao(): void;

    carregarDados(dados: PagedData<any>): void;

    bloquear(): void;

    desbloquear(): void;

}
