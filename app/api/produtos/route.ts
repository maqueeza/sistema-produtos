import { NextResponse } from "next/server";
import { Produto } from "@/classes/Produto";
import { produtos } from "@/data/produtos";

export async function GET() {
    return NextResponse.json(produtos);
}

export async function POST(request: Request){
    const body = await request.json();

    const novoId = produtos.length + 1; //Verifica as linhas e adiciona +1 no ID do próximo.

    const produto = new Produto(
        novoId,
        body.nome,
        Number(body.preco),
        Number(body.quantidade)
    );

    const erro = produto.validar();

    if (erro) {
        return NextResponse.json(
            { erro: erro },
            { status: 400 }
        );
    }


    produtos.push(produto);

    return NextResponse.json(produto, { status: 201 });


}

