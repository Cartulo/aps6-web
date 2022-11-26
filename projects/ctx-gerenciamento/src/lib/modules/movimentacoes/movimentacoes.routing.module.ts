import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MovimentacoesComponent} from './movimentacoes.component';
import {AdicionarMovimentacaoComponent, EditarMovimentacaoComponent, ListarMovimentacoesComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: MovimentacoesComponent,
        children: [
            {path: 'adicionar', component: AdicionarMovimentacaoComponent},
            {path: 'editar/:id', component: EditarMovimentacaoComponent},
            {path: 'listar', component: ListarMovimentacoesComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovimentacoesRoutingModule {
}
