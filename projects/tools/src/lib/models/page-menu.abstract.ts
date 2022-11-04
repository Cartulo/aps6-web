import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {MenuItem, MessageService} from 'primeng/api';
import {AutoUnsubscribe} from '../utils';
import {PageAbstract} from '../abstracts';
import {AuthService} from 'projects/auth/src/lib/services';

@AutoUnsubscribe()
@Component({template: ''})
export abstract class PageMenuAbstract extends PageAbstract implements OnInit {
    public itens: MenuItem[] = [];
    licencaId: string;

    protected constructor(
        protected messageService: MessageService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected authService: AuthService) {
        super(messageService);
    }

    ngOnInit(): void {
        this.carregarMenu();
    }

    protected abstract carregarMenu(): void ;

    protected card(label: string, items?: MenuItem[]): MenuItem {
        return {label, items, visible: true};
    }

    protected menu(label: string, routerLink: string, permission?: string): MenuItem {
        return {
            label,
            routerLink,
            visible: permission ? this.authService.hasPermission(permission) : true
        };
    }
}
