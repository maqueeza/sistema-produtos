import { NextResponse } from "next/server";
import { Cliente } from "@/classes/Cliente";
import{
    buscarClientePorId,
    atualizarCliente,
    deletarCliente,
} from "@/data/clientes";

interface Params{
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: Request, { params }: Params){
    const {id} = await params;
    const idNumero = Number(id);

    const cliente = await buscarClientePorId(idNumero);

    if(!cliente){
        return NextResponse.json(
            {mensagem: "Cliente não encontrado."},
            { status: 404 }
        );
    }

    return NextResponse.json(cliente, {status:200});
}

export async function PUT(request: Request, {params}: Params){
    const {id} = await params;
    const idNumero = Number(id);

    if(isNaN(idNumero)){
        return NextResponse.json(
            {erro: "ID Inválido."},
            { status: 400 }
        );
    }

    const body = await request.json();

    const clienteAtualizado = new Cliente(
        idNumero,
        body.nome,
        body.email,
        body.telefone,
        body.cidade
    );

    const erro = clienteAtualizado.validar();

    if(erro){
        return NextResponse.json(
            {mensagem: erro},
            { status: 400}
        );
    }

    const resultado = await atualizarCliente(clienteAtualizado);

    if(resultado.affectedRows === 0){
        return NextResponse.json(
            {mensagem: "Cliente não encontrado."},
            { status: 404}
        );
    }

    return NextResponse.json(
        {mensagem: "Cliente atualizado com sucesso."},
        {status: 200}
    );
}

export async function DELETE(request: Request, {params}: Params){
    const {id} = await params;
    const idNumero = Number(id);

    if(isNaN(idNumero)){
        return NextResponse.json(
            {erro: "ID Inválido."},
            { status: 400 }
        );
    }

    const resultado = await deletarCliente(idNumero);

    if(resultado.affectedRows === 0){
        return NextResponse.json(
            { mensagem: "Cliente não encontrado."},
            { status: 404 }
        );
    }

    return NextResponse.json(
        { mensagem: "Cliente removido com sucesso."},
        { status: 200}
    );
}