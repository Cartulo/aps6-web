import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Setor } from 'projects/api/src/lib/modules/setores/models/setor';
import { SetoresService } from 'projects/api/src/lib/modules/setores/setores.service';

@Component({
    selector: 'ctx-cadastros-setores-listar',
    templateUrl: './listar-setores.component.html',
})
export class ListarSetoresComponent implements OnInit {
    setores: any;

    entidade: Setor = {
        id: '',
        nome: '',
    };

    entidadeSelecionada: Setor = {
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
        private service: SetoresService
    ) {}

    ngOnInit(): void {
        this.atualizarProdutos();
    }

    onClickNovo() {
        this.router.navigate(['../adicionar'], { relativeTo: this.route });
    }

    async onClickEditar(entidade: Setor): Promise<void> {
        await this.router.navigate(['../editar', entidade.id], {
            relativeTo: this.route,
        });
    }

    onClickExcluir(entidade: Setor) {
        this.confirmationService.confirm({
            message: `Você deseja excluir <strong>${entidade.nome}</strong> da lista de setores?`,
            header: 'Excluir Setor',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.inscricao = this.service.excluir(entidade.id).subscribe(
                    async (res) => {
                        this.atualizarProdutos();
                        this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Setor excluído',
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

    private atualizarProdutos(): any {
        this.service.obterTodos().subscribe(
            async (res) => (this.setores = res),
            (error) => this.messageService.add({
                key: 'bc',
                severity: 'danger',
                summary: 'Erro',
                detail: 'Entre em contato com o suporte',
            })
        );
    }
}
