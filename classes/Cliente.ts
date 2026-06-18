export class Cliente{
        id: number;
        nome: string;
        email: string;
        telefone: string;
        cidade: string;

        constructor(id:number, nome:string, email:string, telefone:string, cidade:string){
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.telefone = telefone;
            this.cidade = cidade;
        }

        validar(): string | null {
            if(!this.nome || this.nome.trim() === ""){
                return "O nome do usuário é obrigatório."
            }

            if(!this.email || this.email.trim() === ""){
                return "O e-mail é obrigatório."
            }

            if(!this.telefone || this.telefone.trim() === ""){
                return "O telefone é obrigatório."
            }

             if(!this.cidade || this.cidade.trim() === ""){
                return "O nome da cidade é obrigatório."
            }

            return null;

        }
    }