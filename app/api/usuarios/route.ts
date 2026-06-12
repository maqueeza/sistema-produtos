import { NextResponse } from "next/server";
import { Usuario } from "@/classes/Usuario";
import { usuarios } from "@/data/usuarios";

export async function GET() {
    return NextResponse.json(usuarios);
}

export async function POST(request: Request){
    const body = await request.json();
    
    const novoId = usuarios.length + 1;

    const usuario = new Usuario(
        novoId,
        body.nome,
        body.email,
        body.telefone,
        body.senha
    );

    const erro = usuario.validar();

    if(erro) {
        return NextResponse.json(
            { erro:erro },
            { status: 400 }
        )
    }

usuarios.push(usuario);

    return NextResponse.json(usuario, { status: 201});

}


//







