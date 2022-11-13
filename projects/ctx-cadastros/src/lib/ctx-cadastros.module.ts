import { NgModule } from '@angular/core';
import { ComponentsModule } from 'projects/components/src/public-api';
import { ToolsModule } from 'projects/tools/src/public-api';
import { CtxCadastrosComponent } from './ctx-cadastros.component';
import { CtxCadastrosRoutingModule } from './ctx-cadastros.routing.module';
import { ProdutosModule } from './modules/produtos/produtos.module';

@NgModule({
    declarations: [CtxCadastrosComponent],
    imports: [
        ComponentsModule,
        ToolsModule,
        CtxCadastrosRoutingModule,
        ProdutosModule,
        // SetoresModule
    ],
    exports: [CtxCadastrosComponent],
})
export class CtxCadastrosModule {}
