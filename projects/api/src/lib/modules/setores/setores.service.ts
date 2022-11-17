import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Setor } from './models/setor';
import { AdicionarSetorRequest, AtualizarSetorRequest } from './models';

@Injectable({ providedIn: 'root' })
export class SetoresService {
    private readonly url = 'https://localhost:7070/api/setores';

    constructor(private http: HttpClient) {}

    obterTodos(): Observable<any> {
        return this.http.get<any>(`${this.url}`).pipe(map((o) => o));
    }

    obterPorId(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`).pipe(map((o) => o));
    }

    adicionar(request: AdicionarSetorRequest): Observable<Setor> {
        return this.http.post<any>(this.url, request);
    }

    editar(id: string, request: AtualizarSetorRequest): Observable<Setor> {
        return this.http.put<any>(`${this.url}/${id}`, request);
    }

    excluir(id: string): Observable<string> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }
}
