import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'cadastros',
                            loadChildren: () =>
                                import('../../projects/ctx-cadastros/src/lib/ctx-cadastros.module')
                                    .then((m) => m.CtxCadastrosModule),
                        },
                        {
                            path: 'gerenciamento',
                            loadChildren: () =>
                                import('../../projects/ctx-gerenciamento/src/lib/ctx-gerenciamento.module')
                                    .then((m) => m.CtxGerenciamentoModule),
                        },
                    ],
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
