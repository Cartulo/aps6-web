import {AutoUnsubscribe} from '../utils';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

import {Message, MessageService} from 'primeng/api';
import {Component} from '@angular/core';

@AutoUnsubscribe()
@Component({template: ''})
export abstract class PageAbstract {
    @BlockUI() private blockUI: NgBlockUI;

    protected constructor(protected messageService: MessageService) {
    }

    protected async block(message?: any): Promise<void> {
        this.blockUI.start(message);
    }

    protected async unlock(): Promise<void> {
        this.blockUI.stop();
    }

    protected async notifySuccess(message: string): Promise<void> {
        await this.notify('success', message);
    }

    protected async notifyError(message: string): Promise<void> {
        await this.notify('error', message);
    }

    protected async notifyErrors(messages: string[]): Promise<void> {
        await this.notifyAll('error', messages);
    }

    protected async notifyWarning(message: string): Promise<void> {
        await this.notify('waring', message);
    }

    protected async notify(color: string, message: string): Promise<void> {
        this.unlock();
        this.messageService.add({severity: color, detail: message});
    }

    protected async notifyAll(color: string, messages: string[]): Promise<void> {
        this.unlock();
        this.messageService.addAll(messages.map(message => ({severity: color, detail: message}) as Message));
    }
}
