import {NgModule} from '@angular/core';

import {ProdutosRoutingModule} from './produtos.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {ProdutosComponent} from './produtos.component';
import {AdicionarProdutoComponent, ListarProdutosComponent} from './pages';

@NgModule({
    declarations: [
        ProdutosComponent,
        AdicionarProdutoComponent,
        // EditarProdutoComponent
        ListarProdutosComponent
    ],
    imports: [
        ProdutosRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class ProdutosModule {
}
