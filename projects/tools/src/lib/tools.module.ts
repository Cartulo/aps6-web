import {NgModule} from '@angular/core';

import {BooleanFormatPipe} from './pipes';

const pipes = [
    BooleanFormatPipe
];

@NgModule({
    imports: [],
    declarations: [
        ...pipes
    ],
    exports: [
        ...pipes
    ]
})
export class ToolsModule {
}
