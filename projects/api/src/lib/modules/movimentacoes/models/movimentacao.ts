export interface Movimentacao {
    id: string;
    quantidade: number;
    produtoId: string;
    produtoDesc: string;
    setorEntradaId: string;
    setorSaidaId: string;
}