import {NgModule} from '@angular/core';

import {SetoresRoutingModule} from './setores.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {SetoresComponent} from './setores.component';
import {ListarSetoresComponent} from './pages/listar-setores/listar-setores.component';

@NgModule({
    declarations: [
        SetoresComponent,
        ListarSetoresComponent,
    ],
    imports: [
        SetoresRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class SetoresModule {
}
