import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SetoresComponent} from './setores.component';
import {ListarSetoresComponent} from './pages/listar-setores/listar-setores.component';
// import {NovoSetorComponent} from './pages/novo-setor/novo-setor.component';
// import {EditarSetorComponent} from './pages/editar-setor/editar-setor.component';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {
        path: '', component: SetoresComponent,
        children: [
            {path: 'listar', component: ListarSetoresComponent},
            // {path: 'adicionar', component: NovoSetorComponent},
            // {path: 'editar/:id', component: EditarSetorComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetoresRoutingModule {
}
