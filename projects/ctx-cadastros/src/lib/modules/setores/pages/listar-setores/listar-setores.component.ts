import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-listar-setores',
    templateUrl: './listar-setores.component.html',
})
export class ListarSetoresComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    //     this.route.params.subscribe(params => this.usuarioId = params['id']);

    //     switch (this.usuarioId) {
    //         case 'c4fd4653-84d1-492f-858a-d786cc574ba6':
    //             this.listaDeIds = Produtos.CarlosEduardo;
    //             this.rows = 50;
    //             break;
    //         case 'dev':
    //             this.listaDeIds = Produtos.Desenvolvedor;
    //             break;
    //     }

    //     this.carregarTodosProdutos();

    //     this.items = [
    //         {
    //             label: '5min',
    //             icon: 'pi pi-refresh',
    //             command: () => this.itemSelecionado = this.items[0].label,
    //         },
    //         {
    //             label: '10min',
    //             icon: 'pi pi-refresh',
    //             command: () => this.itemSelecionado = this.items[1].label,
    //         },
    //         {
    //             label: '15min',
    //             icon: 'pi pi-refresh',
    //             command: () => this.itemSelecionado = this.items[2].label,
    //         },
    //         { separator: true },
    //         {
    //             label: 'Limpar Intervalo',
    //             icon: 'pi pi-times',
    //             command: () => this.itemSelecionado = 'Manual',
    //         },
    //     ];
    }

    // adicionarIntervalo(tempoEmMiliSegundos: number) {
    //     clearInterval(this.intervalo);
    //     this.intervalo = setInterval(() => {
    //         this.carregarTodosProdutos();
    //     }, tempoEmMiliSegundos);
    // }

    // onClickAtualizar() {
    //     switch (this.itemSelecionado) {
    //         case '5min':
    //             this.adicionarIntervalo(300000);
    //             break;
    //         case '10min':
    //             this.adicionarIntervalo(600000);
    //             break;
    //         case '15min':
    //             this.adicionarIntervalo(900000);
    //             break;
    //         default:
    //             clearInterval(this.intervalo);
    //             this.carregarTodosProdutos();
    //             break;
    //     }
    // }

    // onClickInformacoesVendedor(id: string) {
    //     this.exibirModal = !this.exibirModal;
    //     this.relatorioService.obterPorVendedor(id).subscribe((res) => {
    //         this.infoVendedor = res;
    //     });
    // }

    // private carregarTodosProdutos() {
    //     let itemsProdutos: any = [];
    //     forkJoin(this.relatorioService.obterTodosProdutos(this.listaDeIds)).subscribe(
    //         (res: any) => {
    //             res.forEach((obj: any) => {
    //                 if (obj.length != 0) {
    //                     obj.map((produto: any) => itemsProdutos.push(produto));
    //                 }
    //             });

    //             this.produtos = itemsProdutos;
    //         }
    //     );
    // }

}
