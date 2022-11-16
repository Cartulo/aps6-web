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
    request: AdicionarSetorRequest = {
        nome: '',
    };

    form = new FormGroup({
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
        var f = this.form.controls;

        this.request = {
            nome: f.nome.value,
        };

        this.service.adicionar(this.request).subscribe(
            async (res) =>
                this.messageService.add({
                    key: 'bc',
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Setor adicionado',
                }),
            (error) => console.warn(error)
        );
    }

    async onClickVoltar() {
        await this.router.navigate(['../listar'], { relativeTo: this.route });
    }
}
