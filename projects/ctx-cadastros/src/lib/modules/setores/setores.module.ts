import {NgModule} from '@angular/core';

import {SetoresRoutingModule} from './setores.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {SetoresComponent} from './setores.component';
import {ToolsModule} from 'projects/tools/src/public-api';
import { ListarSetoresComponent } from './pages';

@NgModule({
    imports: [
        SetoresRoutingModule,
        ComponentsModule,
        ToolsModule
    ],
    declarations: [
        SetoresComponent,
        ListarSetoresComponent,
        // NovoSetorComponent,
        // EditarSetorComponent,
        // ExcluirSetorComponent,
        // SelecionarSetoresComponent
    ],
    // exports: [
    //     SelecionarSetoresComponent
    // ]
})
export class SetoresModule {
}
