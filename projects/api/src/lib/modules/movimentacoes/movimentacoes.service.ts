import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Movimentacao} from './models/movimentacao';
import {AdicionarMovimentacaoRequest, AtualizarMovimentacaoRequest} from './models';

@Injectable({providedIn: 'root'})
export class MovimentacoesService {
    private readonly url = 'https://localhost:7070/api/movimentacoes';
    produtos: any;

    constructor(private http: HttpClient) { }

    obterTodas(): Observable<void> {
        return this.http.get<any>(`${this.url}`).pipe(map((o) => o));
    }

    obterPorId(id: string): Observable<Movimentacao> {
        return this.http.get<any>(`${this.url}/${id}`).pipe(map((o) => o));
    }

    adicionar(request: AdicionarMovimentacaoRequest): Observable<Movimentacao> {
        return this.http.post<any>(this.url, request);
    }

    editar(id: string, request: AtualizarMovimentacaoRequest): Observable<Movimentacao> {
        return this.http.put<any>(`${this.url}/${id}`, request);
    }

    excluir(id: string): Observable<string> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }

}