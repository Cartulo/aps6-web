import {NgModule} from '@angular/core';

import {ToolsComponent} from './tools.component';
import {DebounceDirective, HasPermissionManagerDirective} from 'projects/tools/src/lib/directives';
import {
    BooleanFormatPipe,
    CepFormatPipe,
    CnpjFormatPipe,
    CpfFormatPipe,
    CurrencyFormat,
    CurrencyRateFormat,
    ImageSecurePipe,
    PdfSecurePipe,
    StringFormatPipe,
    TelefoneFormatPipe,
    VideoSecurePipe
} from 'projects/tools/src/lib/pipes';

const directives = [
    DebounceDirective,
    HasPermissionManagerDirective
];

const pipes = [
    BooleanFormatPipe,
    CepFormatPipe,
    CnpjFormatPipe,
    CpfFormatPipe,
    CurrencyFormat,
    CurrencyRateFormat,
    ImageSecurePipe,
    PdfSecurePipe,
    StringFormatPipe,
    TelefoneFormatPipe,
    VideoSecurePipe
];

@NgModule({
    imports: [],
    declarations: [
        ToolsComponent,
        ...directives,
        ...pipes
    ],
    exports: [
        ToolsComponent,
        ...directives,
        ...pipes
    ]
})
export class ToolsModule {
}
