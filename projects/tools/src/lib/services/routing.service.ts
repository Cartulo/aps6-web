import {Injectable} from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';

import {filter} from 'rxjs/operators';
import {GuidUtils} from '../utils';

@Injectable({providedIn: 'root'})
export class RoutingService {
    private history = [];
    private currentUrl = '';
    private defaultUrl = '/';
    private currentUnidadeId: string = null;

    constructor(public router: Router) {
    }

    public loadRouting(): void {
        this.router.events
            .pipe(filter((evt: any) => evt instanceof RoutesRecognized))
            .subscribe((route: RoutesRecognized) => {
                this.currentUrl = route.urlAfterRedirects;

                const params = this.currentUrl.split('/');
                if (params && params.length > 1 && GuidUtils.isValid(params[1])) {
                    this.currentUnidadeId = params[1];
                } else {
                    this.currentUnidadeId = null;
                }

                this.history.push(this.currentUrl);
            });
    }

    public getHistory(): string[] {
        return this.history;
    }

    public getCurrentUrl(): string {
        return this.currentUrl || this.defaultUrl;
    }

    public getUnityId(): string {
        return this.currentUnidadeId;
    }
}
