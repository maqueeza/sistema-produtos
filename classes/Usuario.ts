    export class Usuario{
        id: number;
        nome: string;
        email: string;
        telefone: string;
        senha: string;

        constructor(id:number, nome:string, email:string, telefone:string, senha:string){
            this.id = id;
            this.nome = nome;
            this.email = email;
            this.telefone = telefone;
            this.senha = senha;
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
            if(!this.senha || this.senha.trim() === "") {
                return "A senha é orbigatória."
                
            }

            return null;

        }
    }