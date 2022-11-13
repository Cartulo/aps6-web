import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'ctx-cadastros-produtos-listar',
    templateUrl: './listar-produtos.component.html'
})
export class ListarProdutosComponent implements OnInit {

    produtos = [
        {
            id: '12345',
            nome: 'Sim',
            setor: 'Alimentício',
            quantidade: 10
        },
        {
            id: '54321',
            nome: 'Não'
        },
    ]

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        ) { ;
    }

    ngOnInit(): void {
    }


}
