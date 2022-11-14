import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProdutosComponent} from './produtos.component';
import {AdicionarProdutoComponent, EditarProdutoComponent, ListarProdutosComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: ProdutosComponent,
        children: [
            {path: 'listar', component: ListarProdutosComponent},
            {path: 'adicionar', component: AdicionarProdutoComponent},
            {path: 'editar/:id', component: EditarProdutoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule {
}
