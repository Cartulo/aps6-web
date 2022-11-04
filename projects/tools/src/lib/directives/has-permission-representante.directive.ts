import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from 'projects/auth/src/lib/services';

@Directive({selector: '[hasPermissionRepresentante]'})
export class HasPermissionRepresentanteDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthService
    ) {
        if (this.auth.hasPermission('Representante')) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
