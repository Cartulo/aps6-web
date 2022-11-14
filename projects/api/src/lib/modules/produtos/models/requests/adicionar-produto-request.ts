export interface AdicionarProdutoRequest {
    id: string;
    grauEscolaridade: number;
    tipo: number;
    nome: string;
    cpf: string;
    email: string;
    nacionalidade: string;
    profissao: string;
    estadoCivil: number;
    telefone: string;
    telefoneTipo: number;
    dataNascimento: Date;
    enderecoIbge: number;
    enderecoUf: string;
    enderecoLocalidade: string;
    enderecoBairro: string;
    enderecoComplemento: string;
    enderecoLogradouro: string;
    enderecoUnidade: string;
    enderecoGia: number;
    enderecoCEP: string;
    enderecoPais: string;
}