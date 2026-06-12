import { NextResponse } from "next/server";
import { Produto } from "@/classes/Produto";
import { produtos } from "@/data/produtos";

type Params = {
    params: Promise < {
        id: string;
    }>;
};

export async function GET(request: Request, { params } : Params){
    const {id} = await params;
    const produtoId = Number(id);

    if(isNaN(produtoId)){
        return NextResponse.json(
            { erro: "ID Inválido."},
            { status: 400}
        );
    }

    const produto = produtos.find((produto) => produto.id === produtoId);

if (!produto){
    return NextResponse.json(
        { erro : "Produto não encontrado."},
        { status: 404 }
    );
}

    return NextResponse.json(produto);

}



export async function PUT(request: Request, { params }: Params){
    const { id } = await params;
    const produtoId = Number(id);

    if(isNaN(produtoId)){
        return NextResponse.json(
            { erro: "ID inválido." },
            { status: 400 }
    );
}

const body = await request.json();

const indiceProduto = produtos.findIndex(
    (produto) => produto.id === produtoId
);

const produtoAtualizado = new Produto (
    produtoId,
    body.nome,
    Number(body.preco),
    Number(body.quantidade)
);

const erro = produtoAtualizado.validar();

if(erro) {
    return NextResponse.json (
        { erro: erro },
        { status: 400 }
    );

}

produtos[indiceProduto] = produtoAtualizado;

return NextResponse.json(produtoAtualizado, { status: 200});

}


export async function DELETE (request: Request, { params }: Params){
    const { id } = await params;
    const produtoId = Number(id);

    if(isNaN(produtoId)){
        return NextResponse.json(
            { erro: "ID inválido." },
            { status: 400 }
        );
    }

    const indiceProduto = produtos.findIndex(
        (produto) => produto.id === produtoId
    );

    if (indiceProduto === -1){
        return NextResponse.json(
            { erro: "Produto não encontrado."},
            { status: 404 }
        );
    }

produtos.splice(indiceProduto, 1);

return NextResponse.json(
    { mensagem: "Produto excluído com sucesso." },
    { status: 200 }
);

}