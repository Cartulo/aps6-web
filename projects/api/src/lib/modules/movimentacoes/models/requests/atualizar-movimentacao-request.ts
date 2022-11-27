export interface AtualizarMovimentacaoRequest {
    id: string;
    quantidade: number;
    produtoId: string;
    setorEntradaId: string;
    setorSaidaId: string;
}