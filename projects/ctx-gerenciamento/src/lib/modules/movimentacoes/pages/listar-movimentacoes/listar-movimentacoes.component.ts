import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Movimentacao} from 'projects/api/src/lib/modules/movimentacoes/models/movimentacao';
import {MovimentacoesService} from 'projects/api/src/lib/modules/movimentacoes/movimentacoes.service';
import {ProdutosService} from 'projects/api/src/lib/modules/produtos/produtos.service';
import {Produto} from 'projects/api/src/lib/modules/produtos/models';
import {SetoresService} from 'projects/api/src/lib/modules/setores/setores.service';
import {Setor} from 'projects/api/src/lib/modules/setores/models/setor';

@Component({
    selector: 'ctx-cadastros-movimentacoes-listar',
    templateUrl: './listar-movimentacoes.component.html',
})
export class ListarMovimentacoesComponent implements OnInit {
    produtos: Produto[] = [];
    setores: Setor[] = [];
    movimentacoes: any;

    entidade: Movimentacao = {
        id: '',
        quantidade: 0,
        produtoId: '',
        setorEntradaId: '',
        setorSaidaId: '',
    };

    entidadeSelecionada: Movimentacao = {
        id: '',
        quantidade: 0,
        produtoId: '',
        setorEntradaId: '',
        setorSaidaId: '',
    };

    inscricao: Subscription = Subscription.EMPTY;
    dialogExcluir: boolean = false;
    position: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private produtosService: ProdutosService,
        private setoresService: SetoresService,
        private service: MovimentacoesService
    ) { }

    ngOnInit(): void {
        this.obterProdutos();
        this.obterSetores();
        this.obterMovimentacoes();
    }

    onClickNovo() {
        this.router.navigate(['../adicionar'], {relativeTo: this.route});
    }

    async onClickEditar(entidade: Movimentacao): Promise<void> {
        await this.router.navigate(['../editar', entidade.id], {
            relativeTo: this.route,
        });
    }

    async onClickAtualizar() {
        this.obterMovimentacoes();
    }

    onClickExcluir(entidade: Movimentacao) {
        this.confirmationService.confirm({
            message: `Você deseja excluir esta movimentação da lista de movimentações?`,
            header: 'Excluir Movimentação',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.inscricao = this.service.excluir(entidade.id).subscribe(
                    async (res) => {
                        this.obterMovimentacoes();
                        this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Movimentação excluída',
                        });
                    },
                    (error) =>
                        this.messageService.add({
                            key: 'bc',
                            severity: 'danger',
                            summary: 'Erro',
                            detail: 'Entre em contato com o suporte',
                        })
                );
            },
        });
    }

    obterNomeDoProdutoPorId(produtoId: string) {
        return this.produtos.filter(o => o.id === produtoId)[0].nome;
    }

    obterNomeDoSetorPorId(setorId: string) {
        return this.setores.filter(o => o.id === setorId)[0].nome;
    }

    private obterMovimentacoes() {
        this.service.obterTodas().subscribe(
            async (res) => {
                this.movimentacoes = res;
            },
            (error) =>
                this.messageService.add({
                    key: 'bc',
                    severity: 'danger',
                    summary: 'Erro',
                    detail: 'Entre em contato com o suporte',
                })
        );
    }

    private obterProdutos() {
        this.produtosService.obterTodos().subscribe(
            async (res) => {
                this.produtos = res;
            },
            (error) =>
                this.messageService.add({
                    key: 'bc',
                    severity: 'danger',
                    summary: 'Erro',
                    detail: 'Entre em contato com o suporte',
                })
        );
    }

    private obterSetores() {
        this.setoresService.obterTodos().subscribe(
            async (res) => {
                this.setores = res;
            },
            (error) =>
                this.messageService.add({
                    key: 'bc',
                    severity: 'danger',
                    summary: 'Erro',
                    detail: 'Entre em contato com o suporte',
                })
        );
    }

}
