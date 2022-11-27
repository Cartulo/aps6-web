import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Produto } from 'projects/api/src/lib/modules/produtos/models/produto';
import { ProdutosService } from 'projects/api/src/lib/modules/produtos/produtos.service';

@Component({
    selector: 'ctx-cadastros-produtos-listar',
    templateUrl: './listar-produtos.component.html',
})
export class ListarProdutosComponent implements OnInit {
    produtos: any;

    entidade: Produto = {
        id: '',
        nome: '',
    };

    entidadeSelecionada: Produto = {
        id: '',
        nome: '',
    };

    inscricao: Subscription = Subscription.EMPTY;
    dialogExcluir: boolean = false;
    position: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private service: ProdutosService
    ) {}

    ngOnInit(): void {
        this.obterProdutos();
    }

    async onClickNovo() {
        await this.router.navigate(['../adicionar'], {
            relativeTo: this.route,
        });
    }

    async onClickEditar(entidade: Produto): Promise<void> {
        await this.router.navigate(['../editar', entidade.id], {
            relativeTo: this.route,
        });
    }

    onClickExcluir(entidade: Produto) {
        this.confirmationService.confirm({
            message: `Você deseja excluir <strong>${entidade.nome}</strong> da lista de produtos?`,
            header: 'Excluir Produto',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.inscricao = this.service.excluir(entidade.id).subscribe(
                    (res) => {
                        this.obterProdutos();
                        this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Produto excluído com sucesso!',
                        });
                    },
                    (error) => this.messageService.add({
                        key: 'bc',
                        severity: 'danger',
                        summary: 'Erro',
                        detail: 'Entre em contato com o suporte',
                    })
                );
            },
        });
    }

    obterProdutos(): any {
        this.service.obterTodos().subscribe(
            async (res) => (this.produtos = res),
            (error) => this.messageService.add({
                key: 'bc',
                severity: 'danger',
                summary: 'Erro',
                detail: 'Entre em contato com o suporte',
            })
        );
    }
}
