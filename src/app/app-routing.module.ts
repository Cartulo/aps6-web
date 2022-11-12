import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { CtxCadastrosComponent } from 'projects/ctx-cadastros/src/lib/ctx-cadastros.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { 
                        path: 'cadastros', 
                        children: [
                            { path: 'produtos', loadChildren: () => import('../../projects/ctx-cadastros/src/lib/modules/produtos/produtos.module').then(m => m.ProdutosModule) },
                            { path: 'setores', loadChildren: () => import('../../projects/ctx-cadastros/src/lib/modules/setores/setores.module').then(m => m.SetoresModule) },
                        ]
                    },
                ],
            },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
