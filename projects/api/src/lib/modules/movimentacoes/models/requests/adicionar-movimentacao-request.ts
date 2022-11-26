export interface AdicionarMovimentacaoRequest {
    id: string | null;
    quantidade: number | null;
    produtoId: string | null;
    setorEntradaId: string | null;
    setorSaidaId: string | null;
}