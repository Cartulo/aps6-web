import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Movimentacao } from './models/movimentacao';
import { AdicionarMovimentacaoRequest, AtualizarMovimentacaoRequest } from './models';
import {ProdutosService} from '../produtos/produtos.service';

@Injectable({ providedIn: 'root' })
export class MovimentacoesService {
    private readonly url = 'https://localhost:7070/api/movimentacoes';
    produtos: any;

    constructor(
        private produtosService: ProdutosService,
        private http: HttpClient) {}

    obterTodosProdutos() {
        this.produtos = this.produtosService.obterTodos();
    }

    obterTodas(): Observable<void> {
        this.obterTodosProdutos();
        return this.http.get<any>(`${this.url}`).pipe(map(o => {
            o[0].produtoDesc = '';
            const result = o;

            return this.formatar(result);
        }));
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

    formatar(entidade: Movimentacao) {
        if (entidade) {
            // TODO :: Descobrir como acessar o primeiro índice do objeto
            console.log(entidade.keys());
            let produtoDesc = this.obterNomeDoProduto(entidade['produtoId']);
            console.log(produtoDesc)
        }
    }

    private obterNomeDoProduto(produtoId: string): string {
        console.log(produtoId);

        this.produtos.find((o: any) => {
            o.id === produtoId ? console.log(o.nome) : 'Não :c'
        });

        return this.produtos.find((o: any) => {
            o.id === produtoId ? o.nome : 'Não :c'
        });
    }
}