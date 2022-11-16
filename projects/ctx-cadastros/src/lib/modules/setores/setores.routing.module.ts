import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SetoresComponent} from './setores.component';
import {AdicionarSetorComponent, ListarSetoresComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: SetoresComponent,
        children: [
            {path: 'adicionar', component: AdicionarSetorComponent},
            // {path: 'editar/:id', component: EditarSetorComponent}
            {path: 'listar', component: ListarSetoresComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetoresRoutingModule {
}
