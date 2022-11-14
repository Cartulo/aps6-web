import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponse, ApiResponseId} from 'projects/auth/src/lib/interfaces';

import {AuthService} from 'projects/auth/src/lib/services';
import {ConfigurationService} from '../../../../../../common/src/lib/config/configuration.service';
import {AutoUnsubscribe} from 'projects/tools/src/lib/utils';
import {AtualizarPessoaLogadaRequest, Investimento, ObterPessoaLogadaResponse} from './models';
import {RadioButtonModel, SelectType} from 'projects/tools/src/lib/models';

@Injectable({providedIn: 'root'})
@AutoUnsubscribe()
export class InvestimentosApiService {
    get url(): string {
        return `${this.configurationService.backendApiUrl}/investimentos/pessoas`;
    }

    //#region Enumerados

    grausEscolaridade = [
        {label: 'Prefiro não informar', value: 1},
        {label: 'Fundamental Completo', value: 2},
        {label: 'Médio Completo', value: 3},
        {label: 'Superior Incompleto', value: 4},
        {label: 'Superior Completo', value: 5},
        {label: 'Pós-graduação', value: 6},
        {label: 'Mestrado/Doutorado', value: 7}
    ]

    estadoCivil = [
        {label: 'Prefiro não informar', value: 1},
        {label: 'Solteiro', value: 2},
        {label: 'Casado', value: 3},
        {label: 'Divorciado', value: 4},
        {label: 'Viúvo', value: 5}
    ]

    faixaEtaria: SelectType = new SelectType([
        {label: 'Menos de 35 anos', value: 1},
        {label: '35 a 50 anos', value: 2},
        {label: '50 a 65 anos', value: 3},
        {label: 'Acima de 65 anos', value: 4},
    ]);

    classificacaoConhecimento: SelectType = new SelectType([
        {label: 'Nenhum', value: 1},
        {label: 'Razoável - possuo conhecimento e experiência no mercado de renda fixa e fundos.', value: 2},
        {label: 'Bom - possuo algum conhecimento no mercado de renda variável.', value: 3},
        {label: 'Excelente - possuo ampla experiência no mercado de renda variável.', value: 4},
    ]);

    investimentosRealizadosPassado: SelectType = new SelectType([
        {label: 'Nunca Investi', value: 1 << 0},
        {label: 'Poupança', value: 1 << 1},
        {label: 'Previdencia Privada', value: 1 << 2},
        {label: 'Títulos de Renda Fixa', value: 1 << 3},
        {label: 'Fundos de Investimentos', value: 1 << 4},
        {label: 'Renda Variavel', value: 1 << 5},
    ]);

    tempoCarteiraInvestimento: SelectType = new SelectType([
        {label: 'Menos de 1 ano', value: 1},
        {label: 'De 1 a 5 anos', value: 2},
        {label: 'De 5 a 10 anos', value: 3},
        {label: 'Acima de 10 anos', value: 4}
    ]);

    toleranciaRisco: SelectType = new SelectType([
        {label: 'Baixa: quero rentabilidade acima da poupança com preservação do poder de compra.', value: 1},
        {label: 'Média: estou disposto a assumir riscos maiores para superar a taxa de juros DI (CDI).', value: 2},
        {label: 'Alta: estou dispostos a assumir riscos elevados para alcançar retornos expressivos.', value: 3},
    ]);

    reacaoQuedaInvestimento: SelectType = new SelectType([
        {label: 'Venderia Imediatamente.', value: 1},
        {label: 'Entendo que estou exposto a esse risco para determinado ativos.', value: 2},
        {label: 'Entendo que meu patrimônio está sujeito a flutuações dessa magnitude e não está 100% protegido.', value: 3}
    ]);

    origemRecursosAplicados: SelectType = new SelectType([
        {label: 'Trabalho', value: 1},
        {label: 'Herança', value: 2},
        {label: 'Aluguel de propriedades', value: 3},
        {label: 'Doação', value: 4},
        {label: 'Dividendos ou Juros sobre Capital Próprio', value: 5},
        {label: 'Outra', value: 6}
    ])

    instituicoesFinanceiras: SelectType = new SelectType([
        {label: 'Àgora', value: 1 << 0},
        {label: 'Avenue', value: 1 << 1},
        {label: 'Banco do Brasil', value: 1 << 2},
        {label: 'Bradesco', value: 1 << 3},
        {label: 'BTG Pactual', value: 1 << 4},
        {label: 'Caixa Econômica Federal', value: 1 << 5},
        {label: 'Clear', value: 1 << 6},
        {label: 'EasyInvest', value: 1 << 7},
        {label: 'Itaú', value: 1 << 8},
        {label: 'Santander', value: 1 << 9},
        {label: 'Órama', value: 1 << 10},
        {label: 'XP Investimentos', value: 1 << 11},
        {label: 'Pi', value: 1 << 12},
        {label: 'Rico', value: 1 << 13},
        {label: 'Sicredi', value: 1 << 14},
        {label: 'Warren', value: 1 << 15},
        {label: 'Outra', value: 1 << 16}
    ])

    statusDeclaracaoIr: SelectType = new SelectType([
        {label: 'Simples', value: 1},
        {label: 'Completa', value: 2},
        {label: 'Nunca declarei', value: 3}
    ])

    //#endregion

    //#region ObterNome

    obterNomeDoGrauEscolaridade(tipo: number): string {
        if (tipo > 7) {
            return 'Grau de Escolaridade Inválido';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.obterGrausDeEscolaridade().find(o => o.value === tipo).label;
    }

    obterNomeDoEstadoCivil(tipo: number): string {
        if (tipo > 5) {
            return 'Estado Civil Inválido';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.obterEstadosCivis().find(o => o.value === tipo).label;
    }

    obterNomeSuitabilityFaixaEtaria(tipo: number): string {
        if (tipo > 4) {
            return 'Faixa Etária Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.faixaEtaria.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSuitabilityClassificacaoConhecimento(tipo: number): string {
        if (tipo > 4) {
            return 'Classificação de Conhecimento Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.classificacaoConhecimento.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSuitabilityinvestimentosRealizadosPassado(tipo: number): string {
        if (tipo === 0) {
            return 'Não informado';
        }

        const dadosSelecionados = this.bitToFormValue(this.investimentosRealizadosPassado.obterTodos().map(o => o.value), tipo);

        let resultado = this.investimentosRealizadosPassado.obterTodos()
            .filter((o, index) => dadosSelecionados[index] === true)
            .map(o => o.label)
            .join(', ');

        const pos = resultado.lastIndexOf(', ');
        resultado = resultado.substring(0, pos) + ' e ' + resultado.substring(pos + 1)

        return resultado;
    }

    obterNomeSituacaoPatrimonialInstituicoesFinanceirasInvestir(tipo: number): string {
        if (tipo === 0) {
            return 'Não informado';
        }

        const dadosSelecionados = this.bitToFormValue(this.instituicoesFinanceiras.obterTodos().map(o => o.value), tipo);

        let resultado = this.instituicoesFinanceiras.obterTodos()
            .filter((o, index) => dadosSelecionados[index] === true)
            .map(o => o.label)
            .join(', ');

        const pos = resultado.lastIndexOf(', ');
        resultado = resultado.substring(0, pos) + ' e ' + resultado.substring(pos + 1)

        return resultado;

    }

    obterNomeSuitabilityTempoCarteiraInvestimento(tipo: number): string {
        if (tipo > 4) {
            return 'Tempo de Carteira Inválido';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.tempoCarteiraInvestimento.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSuitabilityToleranciaRisco(tipo: number): string {
        if (tipo > 3) {
            return 'Tolerância de Risco Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.toleranciaRisco.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSuitabilityReacaoQuedaInvestimento(tipo: number): string {
        if (tipo > 3) {
            return 'Queda de Investimento Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.reacaoQuedaInvestimento.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSituacaoPatrimonialOrigemRecursosAplicados(tipo: number): string {
        if (tipo > 6) {
            return 'Origem de Recursos Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.origemRecursosAplicados.obterTodos().find(o => o.value === tipo).label;
    }

    obterNomeSituacaoPatrimonialStatusDeclaracaoIr(tipo: number): string {
        if (tipo > 3) {
            return 'Status da Declaração de IR Inválida';
        }

        if (tipo === 0) {
            return 'Não informado';
        }

        return this.statusDeclaracaoIr.obterTodos().find(o => o.value === tipo).label;
    }

    //#endregion

    constructor(
        private http: HttpClient,
        private configurationService: ConfigurationService,
        private authService: AuthService) {

    }

    //#region ObterCheckbox ObterRadio
    obterGrausDeEscolaridade() {
        return this.grausEscolaridade;
    }

    obterEstadosCivis() {
        return this.estadoCivil;
    }

    obterCheckboxInvestimentosRealizadosPassado() {
        return this.investimentosRealizadosPassado.obterCheckbox();
    }

    obterCheckboxInstituicoesFinanceiras() {
        return this.instituicoesFinanceiras.obterCheckbox();
    }

    obterRadioFaixaEtaria(): RadioButtonModel[] {
        return this.faixaEtaria.obterRadio();
    }

    obterRadioClassificacaoConhecimento(): RadioButtonModel[] {
        return this.classificacaoConhecimento.obterRadio();
    }

    obterRadioTempoCarteiraInvestimento(): RadioButtonModel[] {
        return this.tempoCarteiraInvestimento.obterRadio();
    }

    obterRadioToleranciaRisco(): RadioButtonModel[] {
        return this.toleranciaRisco.obterRadio();
    }

    obterRadioReacaoQuedaInvestimento(): RadioButtonModel[] {
        return this.reacaoQuedaInvestimento.obterRadio();
    }

    obterRadioOrigemRecursosAplicados(): RadioButtonModel[] {
        return this.origemRecursosAplicados.obterRadio();
    }

    obterRadioStatusDeclaracaoIr(): RadioButtonModel[] {
        return this.statusDeclaracaoIr.obterRadio();
    }

    //#endregion

    carregarPermissoes(): any {
        return {
            podeVisualizar: this.authService.investimentosPessoa(),
        };
    }

    obter(id: string): Observable<ObterPessoaLogadaResponse> {
        return this.http
            .get<ApiResponse<ObterPessoaLogadaResponse>>(`${this.url}/${id}`)
            .pipe(map(o => {
                this.formatar(o.result);
                return o.result
            }));
    }

    obterPessoaLogada(): Observable<ObterPessoaLogadaResponse> {
        return this.http
            .get<ApiResponse<ObterPessoaLogadaResponse>>(`${this.url}/info`)
            .pipe(map(o => o.result));
    }

    atualizarPessoaLogada(request: AtualizarPessoaLogadaRequest): Observable<string> {
        return this.http
            .put<ApiResponse<ApiResponseId>>(this.url, request)
            .pipe(map(o => o.result.id));
    }

    private formatar(entidade: Investimento) {
        if (entidade) {
            entidade.grauEscolaridadeDesc = this.obterNomeDoGrauEscolaridade(entidade.grauEscolaridade);
            entidade.estadoCivilDesc = this.obterNomeDoEstadoCivil(entidade.estadoCivil);
            entidade.suitabilityFaixaEtariaDesc = this.obterNomeSuitabilityFaixaEtaria(entidade.suitabilityFaixaEtaria);
            entidade.suitabilityClassificacaoConhecimentoDesc = this.obterNomeSuitabilityClassificacaoConhecimento(entidade.suitabilityClassificacaoConhecimento);
            entidade.suitabilityTempoCarteiraInvestimentoDesc = this.obterNomeSuitabilityTempoCarteiraInvestimento(entidade.suitabilityTempoCarteiraInvestimento);
            entidade.suitabilityToleranciaRiscoDesc = this.obterNomeSuitabilityToleranciaRisco(entidade.suitabilityToleranciaRisco);
            entidade.suitabilityReacaoQuedaInvestimentoDesc = this.obterNomeSuitabilityReacaoQuedaInvestimento(entidade.suitabilityReacaoQuedaInvestimento);
            entidade.situacaoPatrimonialOrigemRecursosAplicadosDesc = this.obterNomeSituacaoPatrimonialOrigemRecursosAplicados(entidade.situacaoPatrimonialOrigemRecursosAplicados);
            entidade.situacaoPatrimonialStatusDeclaracaoIrDesc = this.obterNomeSituacaoPatrimonialStatusDeclaracaoIr(entidade.situacaoPatrimonialStatusDeclaracaoIr);
        }
    }



    private bitToFormValue(enumeration: object, bit: number) {
        const bits = this.enumToBitValues(enumeration);
        return bits.map(b => (bit & b) === b);
    }

    private enumToBitValues(enumeration: any) {
        return enumeration
            .map(o => o)
            .map(Number)
            .filter(Boolean);
    }
}
