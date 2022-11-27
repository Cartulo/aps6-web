import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Produto } from './models/produto';
import { AdicionarProdutoRequest } from './models/requests/adicionar-produto-request';
import { AtualizarProdutoRequest } from './models/requests/atualizar-produto-request';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
    private readonly url = 'https://localhost:7070/api/produtos';

    constructor(private http: HttpClient) {}

    obterTodos(): Observable<Produto[]> {
        return this.http.get<any>(`${this.url}`).pipe(map((o) => o));
    }

    obterPorId(id: string): Observable<Produto> {
        return this.http.get<any>(`${this.url}/${id}`).pipe(map((o) => o));
    }

    adicionar(request: AdicionarProdutoRequest): Observable<Produto> {
        return this.http.post<any>(this.url, request);
    }

    editar(id: string, request: AtualizarProdutoRequest): Observable<Produto> {
        return this.http.put<any>(`${this.url}/${id}`, request);
    }

    excluir(id: string): Observable<string> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }
}
