import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgControl} from '@angular/forms';

import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
    selector: '[debounce]',
})
export class DebounceDirective implements OnInit, OnDestroy {
    @Output()
    public onDebounce = new EventEmitter<any>();

    @Input('debounce')
    public debounceTime = 500;

    private isFirstChange = true;
    private inscricao: Subscription;

    constructor(public model: NgControl) {
    }

    ngOnInit() {
        this.inscricao = this.model.valueChanges
            .pipe(debounceTime(this.debounceTime))
            .subscribe(modelValue => {
                if (this.isFirstChange) {
                    this.isFirstChange = false;
                } else {
                    this.onDebounce.emit(modelValue);
                }
            });
    }

    ngOnDestroy(): void {
        if (this.inscricao) {
            this.inscricao.unsubscribe();
        }
    }
}
