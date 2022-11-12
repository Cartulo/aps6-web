import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProdutosComponent} from './produtos.component';
import {ListarProdutosComponent} from '../../../../../ctx-cadastros/src/lib/modules/produtos/pages/listar-produtos/listar-produtos.component';
// import {EditarProdutoComponent} from '../../../../../ctx-cadastros/src/lib/modules/produtos/pages/editar-produto/editar-produto.component';
// import {NovoProdutoComponent} from '../../../../../ctx-cadastros/src/lib/modules/produtos/pages/novo-produto/novo-produto.component';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: ProdutosComponent,
        children: [
            {path: 'listar', component: ListarProdutosComponent},
            // {path: 'adicionar', component: NovoProdutoComponent},
            // {path: 'editar/:id', component: EditarProdutoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutosRoutingModule {
}
