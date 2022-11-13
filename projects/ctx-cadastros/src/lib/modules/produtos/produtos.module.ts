import {NgModule} from '@angular/core';

import {ProdutosRoutingModule} from './produtos.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {ProdutosComponent} from './produtos.component';
import {ListarProdutosComponent} from './pages/listar-produtos/listar-produtos.component';
// import {NovoHobbyComponent} from './pages/novo-hobby/novo-hobby.component';
// import {EditarHobbyComponent} from './pages/editar-hobby/editar-hobby.component';
// import {ExcluirHobbyComponent} from './pages/excluir-hobby/excluir-hobby.component';

@NgModule({
    declarations: [
        ProdutosComponent,
        ListarProdutosComponent,
        // NovoHobbyComponent,
        // EditarHobbyComponent,
        // ExcluirHobbyComponent
    ],
    imports: [
        ProdutosRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class ProdutosModule {
}
