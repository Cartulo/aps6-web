import {NgModule} from '@angular/core';
import {ComponentsModule} from 'projects/components/src/public-api';
import {ToolsModule} from 'projects/tools/src/public-api';
import {CtxGerenciamentoComponent} from './ctx-gerenciamento.component';
import {CtxGerenciamentoRoutingModule} from './ctx-gerenciamento.routing.module';
import {MovimentacoesModule} from './modules/movimentacoes/movimentacoes.module';

@NgModule({
    declarations: [CtxGerenciamentoComponent],
    imports: [
        ComponentsModule,
        ToolsModule,
        CtxGerenciamentoRoutingModule,
        MovimentacoesModule
    ],
    exports: [CtxGerenciamentoComponent],
})
export class CtxGerenciamentoModule { }
