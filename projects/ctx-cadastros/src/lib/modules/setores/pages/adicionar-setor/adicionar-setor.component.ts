import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';

import { SetoresService } from 'projects/api/src/lib/modules/setores/setores.service';
import { AdicionarSetorRequest } from 'projects/api/src/lib/modules/setores/models';

@Component({
    selector: 'ctx-cadastros-setores-adicionar',
    templateUrl: './adicionar-setor.component.html',
})
export class AdicionarSetorComponent {
    ptBR: any;
    request: any;

    form: FormGroup = new FormGroup({
        nome: new FormControl(''),
        setor: new FormControl(''),
    });

    constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private service: SetoresService
    ) {}

    onClickSalvar() {
        let f = this.form.controls;

        this.request = {
            nome: f['nome'].value,
        };

        this.service.adicionar(this.request).subscribe(
            async (res) => {
                setTimeout(() => this.messageService.add({
                            key: 'bc',
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Setor adicionado',
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
        await this.router.navigate(['../listar'], { relativeTo: this.route });
    }
}
