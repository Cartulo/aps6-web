import {FormBuilder, FormGroup} from '@angular/forms';

import {PageAbstract} from './page.abstract';
import {StringUtils} from '../utils';
import {MessageService} from 'primeng/api';
import {GenericFormValidation} from '../validation';
import {Component} from '@angular/core';

@Component({template: ''})
export abstract class PageReactiveAbstract extends PageAbstract {
    public errors: any[] = [];
    private displayMessage: { [key: string]: string } = {};
    public form: FormGroup;
    public validationMessages: { [key: string]: { [key: string]: string } };
    public genericValidator: GenericFormValidation;

    public get f() {
        return this.form.controls;
    }

    protected constructor(
        protected messageService: MessageService,
        protected formBuilder: FormBuilder) {
        super(messageService);
    }

    protected setValidationMessages(messages: { [key: string]: { [key: string]: string } }) {
        this.validationMessages = messages;
        this.genericValidator = new GenericFormValidation(this.validationMessages);
    }

    protected async onServerSuccess(callback?: () => void) {
        this.clearErrors();
        this.form.reset();
        await this.unlock();

        if (callback !== undefined && callback !== null) {
            callback.call(undefined);
        }
    }

    protected async onServerFailed(response: any): Promise<void> {
        this.clearErrors();
        this.errors = response;
        await this.notifyMessages();
    }

    protected async onClientFailed(): Promise<boolean> {
        this.clearErrors();

        if (this.form.valid) {
            return false;
        }

        this.displayMessage = this.genericValidator.processMessages(this.form);

        for (const key in this.displayMessage) {
            if (this.displayMessage.hasOwnProperty(key)) {
                this.errors.push(this.displayMessage[key]);
            }
        }

        await this.notifyMessages();
        return true;
    }

    protected clearErrors(): void {
        this.errors = [];
        this.displayMessage = {};
    }

    protected async notifyMessages(): Promise<void> {
        const messages: string[] = [];

        for (const error in this.errors) {
            if (this.errors.hasOwnProperty(error) && !StringUtils.isNullOrEmpty(this.errors[error])) {
                messages.push(this.errors[error]);
            }
        }

        await this.notifyErrors(messages);
    }
}




