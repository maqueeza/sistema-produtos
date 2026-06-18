import { NextResponse } from "next/server";
import { Cliente } from "@/classes/Cliente";
import {
    listarClientes,
    cadastrarCliente,
} from "@/data/clientes";

export async function GET(){
    const clientes = await listarClientes();

    return NextResponse.json(clientes, { status: 200});
}

export async function POST(request: Request){
    const body = await request.json();

    const novoCliente = new Cliente(
        0,
        body.nome,
        body.email,
        body.telefone,
        body.cidade
    )


    const erro = novoCliente.validar();

    if(erro){
        return NextResponse.json(
            {mensagem: erro},
            { status: 400}
        );
    }

    const idNovoCliente = await cadastrarCliente(novoCliente);

    return NextResponse.json(
        {
            mensagem: "Cliente cadastrado com sucesso",
            cliente: {
                id: idNovoCliente,
                nome: novoCliente.nome,
            },
        },
        {status:201}
    );


}