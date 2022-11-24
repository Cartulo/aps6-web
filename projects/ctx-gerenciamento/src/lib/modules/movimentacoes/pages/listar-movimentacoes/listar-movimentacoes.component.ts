import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Movimentacao } from 'projects/api/src/lib/modules/movimentacoes/models/movimentacao';
import { MovimentacoesService } from 'projects/api/src/lib/modules/movimentacoes/movimentacoes.service';

@Component({
    selector: 'ctx-cadastros-movimentacoes-listar',
    templateUrl: './listar-movimentacoes.component.html',
})
export class ListarMovimentacoesComponent implements OnInit {
    produtos: any;
    movimentacoes: any;

    entidade: Movimentacao = {
        id: '',
        quantidade: 0,
        produtoId: '',
        produtoDesc: '',
        setorEntradaId: '',
        setorSaidaId: '',
    };

    entidadeSelecionada: Movimentacao = {
        id: '',
        quantidade: 0,
        produtoId: '',
        produtoDesc: '',
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
        private service: MovimentacoesService
    ) {}
    
    ngOnInit(): void {
        this.atualizarMovimentacoes();
    }

    onClickNovo() {
        this.router.navigate(['../adicionar'], { relativeTo: this.route });
    }

    async onClickEditar(entidade: Movimentacao): Promise<void> {
        await this.router.navigate(['../editar', entidade.id], {
            relativeTo: this.route,
        });
    }

    async onClickAtualizar() {
        this.atualizarMovimentacoes();
        console.log(this.movimentacoes);
    }

    onClickExcluir(entidade: Movimentacao) {
        this.confirmationService.confirm({
            message: `Você deseja excluir esta movimentação da lista de movimentações?`,
            header: 'Excluir Movimentacao',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.inscricao = this.service.excluir(entidade.id).subscribe(
                    async (res) => {
                        this.atualizarMovimentacoes();
                        this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Movimentacao excluído',
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

    private atualizarMovimentacoes(): any {
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

}
