import {Injectable} from '@angular/core';
import {AutoUnsubscribe} from '../utils';
import {StorageService} from './storage.service';
import {StorageEvents} from '../events';

@Injectable({providedIn: 'root'})
@AutoUnsubscribe()
export class UtilsService {
    constructor(private storage: StorageService) {
    }

    aguardar(ms: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    atualizarTempoAtualizacao(id: any): void {
        this.storage.setStringify(StorageEvents.TEMPO_ATUALIZACAO, id);
    }

    obterTempoAtualizacao(): any {
        return this.storage.getParse(StorageEvents.TEMPO_ATUALIZACAO);
    }
}
