import { conexao } from "@/lib/conexao";
import { Cliente } from "@/classes/Cliente";

export async function listarClientes(){
    const [resultado]: any = await conexao.query(
        "SELECT * FROM clientes"
    );

    return resultado[0];
}

export async function buscarClientePorId(id: number){
    const [resultado]: any = await conexao.query(
        "SELECT * FROM clientes WHERE id = ?",
        [id]
    );

    return resultado [0];
}

export async function cadastrarCliente(cliente: Cliente){
    const [resultado]: any = await conexao.query(
        "INSERT INTO clientes (nome, email, telefone, cidade) VALUES (?, ?, ?, ?)",
        [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.cidade,
        ]
    );

    return resultado.insertId;
}

export async function atualizarCliente(cliente: Cliente){
    const [resultado]: any = await conexao.query(
        "UPDATE clientes SET nome = ?, email = ?, telefone = ?, cidade = ? WHERE id = ?",
        [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.cidade,
            cliente.id,
        ]
    );

    return resultado;
}

export async function deletarCliente(id: number){
    const [resultado]: any = await conexao.query(
        "DELETE FROM clientes WHERE id = ?",
        [id]
    );

    return resultado;
}