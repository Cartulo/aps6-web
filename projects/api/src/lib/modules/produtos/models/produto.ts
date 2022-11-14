export interface Produto {
    id: string;
    status: number;
    grauEscolaridade: number;
    grauEscolaridadeDesc: string;
    tipo: number;
    nome: string;
    cpf: string;
    email: string;
    nacionalidade: string;
    profissao: string;
    estadoCivil: number;
    estadoCivilDesc: string;
    telefone: string;
    telefoneTipo: number;
    dataNascimento: Date;
    enderecoIBGE: number;
    enderecoUF: string;
    enderecoLocalidade: string;
    enderecoBairro: string;
    enderecoComplemento: string;
    enderecoLogradouro: string;
    enderecoUnidade: string;
    enderecoGIA: number;
    enderecoCEP: string;
    enderecoPais: string;
}