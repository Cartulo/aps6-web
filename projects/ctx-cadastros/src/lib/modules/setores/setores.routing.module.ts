import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SetoresComponent} from './setores.component';
import {AdicionarSetorComponent, EditarSetorComponent, ListarSetoresComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: SetoresComponent,
        children: [
            {path: 'listar', component: ListarSetoresComponent},
            {path: 'adicionar', component: AdicionarSetorComponent},
            {path: 'editar/:id', component: EditarSetorComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetoresRoutingModule {
}
