export interface AdicionarMovimentacaoRequest {
    id: string;
    quantidade: number;
    produtoId: string;
    setorEntradaId: string;
    setorSaidaId: string;
}