import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CtxCadastrosComponent} from './ctx-cadastros.component';


const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {
        path: '',
        component: CtxCadastrosComponent,
        children: [
            {
                path: 'produtos',
                loadChildren: () => import('./modules/produtos/produtos.module').then(m => m.ProdutosModule)
            },
            {
                path: 'setores',
                loadChildren: () => import('./modules/setores/setores.module').then(m => m.SetoresModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CtxCadastrosRoutingModule {
}
