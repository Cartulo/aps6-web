import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ComponentsComponent} from './components.component';
import {PrimeNGModule} from './primeng/primeng.module';

@NgModule({
    declarations: [
        ComponentsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule,
        ComponentsComponent
    ]
})
export class ComponentsModule {
}
