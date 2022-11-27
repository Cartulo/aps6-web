import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AdicionarMovimentacaoRequest} from 'projects/api/src/lib/modules/movimentacoes/models';
import {MovimentacoesService} from 'projects/api/src/lib/modules/movimentacoes/movimentacoes.service';
import {ProdutosService} from 'projects/api/src/lib/modules/produtos/produtos.service';
import {SetoresService} from 'projects/api/src/lib/modules/setores/setores.service';

@Component({
    selector: 'ctx-cadastros-movimentacao-adicionar',
    templateUrl: './adicionar-movimentacao.component.html',
})
export class AdicionarMovimentacaoComponent implements OnInit {
    request: AdicionarMovimentacaoRequest = {
        id: '',
        quantidade: 0,
        produtoId: '',
        setorEntradaId: '',
        setorSaidaId: ''
    };

    form = new FormGroup({
        id: new FormControl(''),
        quantidade: new FormControl(0),
        produtoId: new FormControl(''),
        setorEntradaId: new FormControl(''),
        setorSaidaId: new FormControl(''),
    });

    produtos: any;
    setores: any;

    constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
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
    }

    onClickSalvar() {
        var f = this.form.controls;

        this.request = {
            id: f.id.value,
            quantidade: f.quantidade.value,
            produtoId: f.produtoId.value,
            setorEntradaId: f.setorEntradaId.value,
            setorSaidaId: f.setorSaidaId.value,
        };

        this.service.adicionar(this.request).subscribe(
            async (res) => {
                setTimeout(() => this.messageService.add({
                    key: 'bc',
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Movimentação adicionada',
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
        await this.router.navigate(['../listar'], {relativeTo: this.route});
    }

    onSelectProduto(evento: any) {
        this.form.patchValue({produtoId: evento.value.id})
    }

    onSelectSetor(evento: any, setor: string) {
        if (setor === 'entrada') {
            this.form.patchValue({setorEntradaId: evento.value.id})
        }

        if (setor === 'saida') {
            this.form.patchValue({setorSaidaId: evento.value.id})
        }
    }
}
