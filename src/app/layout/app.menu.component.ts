import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Cadastros',
                items: [
                    {label: 'Produtos', routerLink: ['cadastros/produtos']},
                    {label: 'Setores', routerLink: ['cadastros/setores']}
                ]
            },
            {
                label: 'Gerenciamento',
                items: [
                    {label: 'Movimentações', routerLink: ['gerenciamento/movimentacoes']}
                ]
            }
        ];
    }
}
