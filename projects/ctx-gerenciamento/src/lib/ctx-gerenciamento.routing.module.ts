import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CtxGerenciamentoComponent} from './ctx-gerenciamento.component';

const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {
        path: '',
        component: CtxGerenciamentoComponent,
        children: [
            {
                path: 'movimentacoes',
                loadChildren: () => import('./modules/movimentacoes/movimentacoes.module').then(m => m.MovimentacoesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CtxGerenciamentoRoutingModule {
}
