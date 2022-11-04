import {Injectable} from '@angular/core';

import {AutoUnsubscribe} from '../utils/auto-unsubscribe';

@Injectable({providedIn: 'root'})
@AutoUnsubscribe()
export class StorageService {

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    setStringify(key: string, value: any): void {
        this.set(key, JSON.stringify(value));
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    getParse(key: string): any | null {
        return JSON.parse(this.get(key));
    }
}
