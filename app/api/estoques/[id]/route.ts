import { NextResponse } from "next/server";
import { Estoque } from "@/classes/Estoque";
import { estoques } from "@/data/estoques";

type Params = {
    params: Promise < {
        id: string;
    }>;
}

export async function GET(request: Request, { params } : Params){
    const {id} = await params;
    const estoqueId = Number(id);

    if(isNaN(estoqueId)){
        return NextResponse.json(
            { erro: "ID Inválido. "},
            { status: 400 }
        );
    }

    const estoque = estoques.find((estoque) => estoque.id === estoqueId);

    if(!estoque){
        return NextResponse.json(
            { erro: "Estoque não encontrado. "},
            { status: 404}
        );
    }

    return NextResponse.json(estoque);
}

export async function PUT(request: Request, { params }: Params){
    const {id} = await params;
    const estoqueId = Number(id);

    if(isNaN(estoqueId)){
        return NextResponse.json(
            { erro: "ID inválido."},
            { status: 400}
        );
    }

    const body = await request.json();

    const  indiceEstoque = estoques.findIndex(
        (estoque) => estoque.id === estoqueId
    );

    const estoqueAtualizado = new Estoque (
        estoqueId,
        Number(body.produtoId),
        Number(body.quantidade),
        Number(body.estoqueMinimo),
        body.localizacao
    );

    const erro = estoqueAtualizado.validar();

    if(erro) {
        return NextResponse.json (
            { erro: erro },
            { status: 400 }
          );
    }

    estoques[indiceEstoque] = estoqueAtualizado;

    return NextResponse.json(estoqueAtualizado, { status: 200});

}

export async function DELETE (request: Request, { params }: Params){
    const {id} = await params;
    const estoqueId = Number(id);

    if(isNaN(estoqueId)){
        return NextResponse.json(
            {erro: "ID inválido."},
            { status: 400}
        );
    }

    const indiceEstoque = estoques.findIndex(
      (estoque) => estoque.id === estoqueId  
    );

    if(indiceEstoque === -1){
        return NextResponse.json(
            { erro: "Estoque não encontrado."},
            { status: 404}
        );
    }

    estoques.splice(indiceEstoque, 1);

    return NextResponse.json(
        { mensagem: "Estoque excluído com sucesso."},
        { status: 200 }
    );
}