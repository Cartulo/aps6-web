import {Component, Input, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';

import {Movimentacao} from 'projects/api/src/lib/modules/movimentacoes/models/movimentacao';
import {MovimentacoesService} from 'projects/api/src/lib/modules/movimentacoes/movimentacoes.service';
import {ProdutosService} from 'projects/api/src/lib/modules/produtos/produtos.service';
import {SetoresService} from 'projects/api/src/lib/modules/setores/setores.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ctx-cadastros-movimentacoes-editar',
    templateUrl: './editar-movimentacao.component.html',
})
export class EditarMovimentacaoComponent implements OnInit {
    inscricao: Subscription = Subscription.EMPTY;

    form: FormGroup = new FormGroup({
        id: new FormControl(),
        quantidade: new FormControl(),
        produtoId: new FormControl(),
        setorEntradaId: new FormControl(),
        setorSaidaId: new FormControl(),
    });

    @Input() entidade: Movimentacao = {
        id: '',
        quantidade: 0,
        produtoId: '',
        setorEntradaId: '',
        setorSaidaId: ''
    };

    request: any;

    id: string = '';

    produtos: any;
    setores: any;

    constructor(
        protected formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private produtosService: ProdutosService,
        private setoresService: SetoresService,
        private service: MovimentacoesService
    ) { }

    ngOnInit(): void {
        this.produtos = this.produtosService.obterTodos().subscribe(
            async (res) => (this.produtos = res),
            (error) => console.log(error)
        );

        this.setores = this.setoresService.obterTodos().subscribe(
            async (res) => (this.setores = res),
            (error) => console.log(error)
        );

        this.form = this.formBuilder.group({
            id: [null, [Validators.required]],
            quantidade: [null, [Validators.required]],
            produtoId: [null, [Validators.required]],
            setorEntradaId: [null, [Validators.required]],
            setorSaidaId: [null, [Validators.required]],
        });

        this.route.params.subscribe((params) => {
            this.id = params['id'];

            this.inscricao = this.service.obterPorId(this.id).subscribe(
                async (res) => {
                    this.entidade = res;
                    this.form.patchValue({
                        id: this.entidade.id,
                        quantidade: this.entidade.quantidade,
                        produtoId: this.entidade.produtoId,
                        setorEntradaId: this.entidade.setorEntradaId,
                        setorSaidaId: this.entidade.setorSaidaId
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
        });
    }

    async onClickSalvar() {
        let f = this.form.controls;

        this.request = {
            id: f['id'].value,
            quantidade: f['quantidade'].value,
            produtoId: f['produtoId'].value,
            setorEntradaId: f['setorEntradaId'].value,
            setorSaidaId: f['setorSaidaId'].value
        };

        this.service.editar(this.request.id, this.request).subscribe(
            async (res) => {
                setTimeout(() => this.messageService.add({
                    key: 'bc',
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Movimentacao atualizado',
                }), 100
                );
                this.onClickVoltar();
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

    async onClickVoltar() {
        await this.router.navigate(['../../listar'], {
            relativeTo: this.route,
        });
    }

}
