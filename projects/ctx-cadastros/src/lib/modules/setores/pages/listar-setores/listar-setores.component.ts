import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'ctx-cadastros-setores-listar',
    templateUrl: './listar-setores.component.html'
})
export class ListarSetoresComponent implements OnInit {

    produtos = [
        {
            id: '1',
            nome: 'Alimentício',
        },
        {
            id: '2',
            nome: 'Limpeza'
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
