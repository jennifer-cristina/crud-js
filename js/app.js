'use strict'

import { openModal, closeModal } from './modal.js'
import { readCustomers, createCustomers, deleteCustomer, updateCustomer} from './customers.js'

// Trazerá apenas um cliente, utilizando o map passará por todos do array
const createRow = (customers) => {
    const row = document.createElement('tr')
    row.innerHTML = `
                    <td>${customers.nome}</td>
                    <td>${customers.email}</td>
                    <td>${customers.celular}</td>
                    <td>${customers.cidade}</td>
                    <td>
                        <button type="button" class="button green" onClick="editCustomer(${customers.id})">editar</button>
                        <button type="button" class="button red" onClick="delCustomer(${customers.id})">excluir </button>
                    </td>
    `
    return row
}

const updateTable = async () => {

    const customersContainer = document.getElementById('customers-container')
    // Ler a API e armazenar o resultado em uma variável
    // Customers: clientes

    const customers = await readCustomers()

    // Preencher a tabela com as informações 
    const rows = customers.map(createRow)
    customersContainer.replaceChildren(...rows)

}

const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

// Salvando os dados do cliente e mandando para a API
const saveCustomers = async () => {
    // Criar um json com as informações do Cliente
    const customers = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    if(isEdit()){
        customers.id = document.getElementById('nome').dataset.id
        await updateCustomer(customers)
    } else{
        await createCustomers(customers)
    }

    // Enviar o json para o Servidor API
    await createCustomers(customers)

    // Fechar a modal 
    closeModal()

    // Atualizar
    updateTable()

}

const fillFormCustomer = (customers) => {

    document.getElementById('nome').value = customers.nome
    document.getElementById('email').value = customers.email
    document.getElementById('celular').value = customers.celular
    document.getElementById('cidade').value = customers.cidade
    document.getElementById('nome').dataset.id = customers.id

}

globalThis.editCustomer = async(id) => {
    //armazenar as informações do cliente selecionado em uma variável

    const customer = await readCustomers(id)
    console.log(customer)

    //preencher o formulário com as informações
    fillFormCustomer(customer)

    //abrir o modal no estado de edição
    openModal()
}

globalThis.delCustomer = async(id) => {
    await deleteCustomer(id)
    updateTable()
}

const actionCustomer = async (event) => { 

    if (event.target.type == 'button') {

        const [action, codigo] = event.target.id.split('-')

        if (action == 'editar') {
            console.log('foi')
        } else if (action == 'excluir') {
            await deleteCustomer(codigo)
            updateTable()
        }
    }
}


updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', await saveCustomers)
document.getElementById('customers-container').addEventListener('click', actionCustomer)