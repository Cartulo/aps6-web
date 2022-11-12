import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'ctx-cadastros-produtos-listar',
    templateUrl: './listar-produtos.component.html'
})
export class ListarProdutosComponent implements OnInit {
    // request: ObterTodasRequest;
    // entidadeSelecionada: Produto;
    // dialogExcluir: boolean;

    constructor(
        // protected messageService: MessageService,
        // protected formBuilder: FormBuilder,
        // public utilService: UtilService,
        private router: Router,
        private route: ActivatedRoute,
        // private service: ProdutosService
        ) { ;
    }

    ngOnInit(): void {
    }


}
