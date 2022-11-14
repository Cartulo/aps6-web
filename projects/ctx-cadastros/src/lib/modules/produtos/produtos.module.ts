import {NgModule} from '@angular/core';

import {ProdutosRoutingModule} from './produtos.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {ProdutosComponent} from './produtos.component';
import {AdicionarProdutoComponent, EditarProdutoComponent, ExcluirProdutoComponent, ListarProdutosComponent} from './pages';

@NgModule({
    declarations: [
        ProdutosComponent,
        ListarProdutosComponent,
        AdicionarProdutoComponent,
        EditarProdutoComponent,
        ExcluirProdutoComponent
    ],
    imports: [
        ProdutosRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class ProdutosModule {
}
