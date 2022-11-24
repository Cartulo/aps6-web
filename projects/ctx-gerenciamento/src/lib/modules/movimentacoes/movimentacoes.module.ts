import {NgModule} from '@angular/core';

import {MovimentacoesRoutingModule} from './movimentacoes.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {MovimentacoesComponent} from './movimentacoes.component';
import {
    // AdicionarMovimentacaoComponent, EditarMovimentacaoComponent, 
    ListarMovimentacoesComponent} from './pages';

@NgModule({
    declarations: [
        MovimentacoesComponent,
        // AdicionarMovimentacaoComponent,
        // EditarMovimentacaoComponent,
        ListarMovimentacoesComponent
    ],
    imports: [
        MovimentacoesRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class MovimentacoesModule {
}
