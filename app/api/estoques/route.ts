import { NextResponse } from "next/server";
import { Estoque } from "@/classes/Estoque";
import { estoques } from "@/data/estoques";

export async function GET() {
    return NextResponse.json(estoques);
}

export async function POST (request: Request){
    const body = await request.json();

    const novoId = estoques.length + 1;

    const estoque = new Estoque(
        novoId,
        Number(body.produtoId),
        Number(body.quantidade),
        Number(body.estoqueMinimo),
        body.localizacao
        
    );

    const erro = estoque.validar();

    if (erro) {
        return NextResponse.json(
            { erro: erro },
            { status: 400}
        );
    }

estoques.push(estoque);

return NextResponse.json(estoque, { status: 201 });

}