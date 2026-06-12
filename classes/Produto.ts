export class Produto {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;

    constructor (id: number, nome: string, preco: number, quantidade: number){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    validar(): string | null {
        if(!this.nome || this.nome.trim() === ""){
            return "O nome do produto é obrigatório.";
        }

        if(this.preco <= 0){
            return "O preço deve ser maior que zero."
        }

        if(this.quantidade < 0){
            return "A quantidade não pode ser negativa."
        }

        return null;
    }


}