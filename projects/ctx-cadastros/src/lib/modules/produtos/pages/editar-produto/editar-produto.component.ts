// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, Validators} from '@angular/forms';
// import {ActivatedRoute, Router} from '@angular/router';

// import {Subscription} from 'rxjs';
// import {MessageService} from 'primeng/api';
// import {StringUtils} from '../../../../../../../tools/src/lib/utils';
// import {PageReactiveAbstract} from '../../../../../../../tools/src/lib/abstracts';
// import {DateService} from '../../../../../../../tools/src/lib/services';
// import {AtualizarProdutoRequest, Produto} from 'projects/api/src/lib/modules/clientes/produtos/models';
// import {ProdutosService} from 'projects/api/src/lib/modules/clientes';

// @Component({
//     selector: 'ctx-cadastros-produtos-editar',
//     templateUrl: './editar-produto.component.html'
// })
// export class EditarProdutoComponent extends PageReactiveAbstract implements OnInit {
//     inscricao: Subscription;
//     ptBR: any;
//     valorMask: any;
//     id: string;
//     request: AtualizarProdutoRequest;
//     entidade: Produto;

//     constructor(
//         protected messageService: MessageService,
//         protected formBuilder: FormBuilder,
//         private router: Router,
//         private route: ActivatedRoute,
//         private service: ProdutosService,
//         private dateService: DateService) {
//         super(messageService, formBuilder);
//         this.ptBR = this.dateService.getLocale();
//         this.valorMask = StringUtils.obterMascaraMoeda();

//         super.setValidationMessages({
//             nome: {
//                 required: 'Informe o nome'
//             },
//             codigo: {
//                 required: 'Informe o código'
//             }
            
//         });
//     }

//     ngOnInit(): void {
//         this.form = this.formBuilder.group({
//             nome: [null, [Validators.required]],
//             codigo: [null, [Validators.required]]
//         });

//         this.route.params.subscribe(params => {
//             this.id = params.id;

//             if (StringUtils.isNullOrEmpty(this.id)) {
//                 return;
//             }

//             this.inscricao = this.service.obter(this.id).subscribe(
//                 res => {
//                     setTimeout(() => {
//                         this.entidade = res;
//                         this.form.patchValue({
//                             nome: this.entidade.nome,
//                             codigo: this.entidade.codigo
//                         });
//                     }, 100);
//                 },
//                 error => this.onServerFailed(error)
//             );
//         });
//     }

//     async onClickSalvar() {
//         if (await this.onClientFailed()) {
//             return;
//         }

//         this.block();

//         this.request = {
//             id: this.id,
//             nome: this.f.nome.value,
//             codigo: this.f.codigo.value
//         };

//         this.inscricao = this.service.atualizar(this.id, this.request)
//             .subscribe(
//                 () => this.onServerSuccess(() => this.onClickVoltar()),
//                 error => this.onServerFailed(error)
//             );
//     }

//     async onClickVoltar() {
//         await this.router.navigate(['../../listar'], {relativeTo: this.route});
//     }
// }