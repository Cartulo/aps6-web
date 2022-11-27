import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { Setor } from 'projects/api/src/lib/modules/setores/models/setor';
import { SetoresService } from 'projects/api/src/lib/modules/setores/setores.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ctx-cadastros-setores-editar',
    templateUrl: './editar-setor.component.html',
})
export class EditarSetorComponent implements OnInit {
    inscricao: Subscription = Subscription.EMPTY;

    form: FormGroup = new FormGroup({
        id: new FormControl(),
        nome: new FormControl(),
    });

    entidade: Setor = {
        id: '',
        nome: '',
    };

    request: any;

    id: string = '';

    constructor(
        protected formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private service: SetoresService
    ) {}

    ngOnInit(): void {
        var f = this.form.controls;

        this.form = this.formBuilder.group({
            id: [null, [Validators.required]],
            nome: [null, [Validators.required]],
        });

        this.route.params.subscribe((params) => {
            this.id = params['id'];

            this.inscricao = this.service.obterPorId(this.id).subscribe(
                async (res) => {
                    this.entidade = res;
                    this.form.patchValue({
                        id: this.entidade.id,
                        nome: this.entidade.nome,
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
            nome: f['nome'].value,
        };

        this.service.editar(this.request.id, this.request).subscribe(
            async (res) => {
                setTimeout(() => this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Setor atualizado',
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
