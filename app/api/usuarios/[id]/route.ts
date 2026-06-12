import { NextResponse } from "next/server";
import { Usuario } from "@/classes/Usuario";
import { usuarios } from "@/data/usuarios"; 

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request:Request, {params}: Params) {
    const {id} = await params;
    const usuarioId = Number(id);

    if(isNaN(usuarioId)){
        return NextResponse.json(
            {erro:"Id inválido"},
            {status: 400}
        );
    }

    const usuario = usuarios.find ((usuario) => usuario.id === usuarioId);

    if(!usuario){
        return NextResponse.json(
            {erro: "Usuário não encontrado."},
            {status: 404}
        );
    }

    return NextResponse.json(usuario);  


}


export async function PUT(request: Request, {params }:Params){
    const {id} = await params;
    const usuarioId = Number (id);

    if(isNaN(usuarioId)){
        return NextResponse.json(
            {erro: "ID Inválido."},
            {status: 400}
        );
    }

    const body = await request.json();

    const indiceUsuario = usuarios.findIndex((usuario) => usuario.id === usuarioId);

    if(indiceUsuario === -1){
        return NextResponse.json(
            {erro: "Usuário não encontrado"},
            {status:404}
        );
    }

    const usuarioAtualizado = new Usuario(
        usuarioId,
        body.nome,
        body.email,
        body.telefone,
        body.senha
    );

    const erro = usuarioAtualizado.validar();

    if(erro){
        return NextResponse.json(
            {erro: erro},
            {status : 400}
        );
    }



    usuarios[indiceUsuario] = usuarioAtualizado;

    return NextResponse.json(usuarioAtualizado, {status:200});

} 
    

export async function DELETE(request: Request, {params}: Params){
        const { id } = await params;
        const usuarioId = Number(id);

        if(isNaN(usuarioId)){
            return NextResponse.json(
                {erro: "ID Inválido."},
                {status: 400}
            );
        }
        const indiceUsuario = usuarios.findIndex((usuario) => usuario.id === usuarioId);

        if(indiceUsuario === -1){
            return NextResponse.json(
                {erro: "Usuário não encontrado"},
                {status: 404}

            )
        }

        usuarios.splice(indiceUsuario, 1);

        return NextResponse.json(
            {mensagem: "Usuário excluído com sucesso."},
            { status: 200}
        );
    }

