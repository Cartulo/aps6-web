import {NgModule} from '@angular/core';

import {SetoresRoutingModule} from './setores.routing.module';
import {ComponentsModule} from 'projects/components/src/lib/components.module';
import {ToolsModule} from 'projects/tools/src/lib/tools.module';
import {SetoresComponent} from './setores.component';
import {AdicionarSetorComponent, EditarSetorComponent, ExcluirSetorComponent, ListarSetoresComponent} from './pages';

@NgModule({
    declarations: [
        SetoresComponent,
        AdicionarSetorComponent,
        EditarSetorComponent,
        ExcluirSetorComponent,
        ListarSetoresComponent
    ],
    imports: [
        SetoresRoutingModule,
        ComponentsModule,
        ToolsModule
    ]
})
export class SetoresModule {
}
