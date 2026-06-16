export class Estoque {
    id: number;
    produtoId: number;
    quantidade: number;
    estoqueMinimo: number;
    localizacao: string;

    constructor(id: number, produtoId: number, 
        quantidade: number, estoqueMinimo: number, localizacao: string){
            this.id = id;
            this.produtoId = produtoId;
            this.quantidade = quantidade;
            this.estoqueMinimo = estoqueMinimo;
            this.localizacao = localizacao;

        }

        validar() : string | null {
        if(this.produtoId <= 0){
            return "O Id do produto deve ser válido."

}
        if(this.quantidade <= 0){
                return "Quantidade Inválida."

            }
        if(this.estoqueMinimo < 0){
            return "O estoque mínimo é orbigatório."
        }
        
        if(!this.localizacao || this.localizacao.trim() === "" ){
            return "A Localização é obrigatória."
        }

            return null;
        }

        
}