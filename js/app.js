'use strict'

import { openModal, closeModal } from './modal.js'
import { readCustomers, createCustomers, deleteCustomer, readCustomerById, fillFormCustomer, updateCustomer } from './customers.js'

// Trazerá apenas um cliente, utilizando o map passará por todos do array
const createRow = (customers) => {
    const row = document.createElement('tr')
    row.innerHTML = `
                    <td>${customers.nome}</td>
                    <td>${customers.email}</td>
                    <td>${customers.celular}</td>
                    <td>${customers.cidade}</td>
                    <td>
                        <button type="button" class="button green" id="editar-${customers.id}">editar</button>
                        <button type="button" class="button red" id="excluir-${customers.id}">excluir </button>
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

    // Enviar o json para o Servidor API
    await createCustomers(customers)

    // Fechar a modal 
    closeModal()

    // Atualizar
    updateTable()
}

const editCustomer = async () => {

    const customers = {
        "id": document.getElementById('enviar').value,
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    await updateCustomer(customers)

    closeModal()

    updateTable()
}

const sendCustomers = async (event) => {

    const method = event.target.textContent.toUpperCase()

    if (method == 'SALVAR') {
        await saveCustomers()
    } else if (method == 'EDITAR') {
        await editCustomer()
    }

    clearForm()
}

const actionCustomer = async (event) => {

    if (event.target.type == 'button') {

        const [action, codigo] = event.target.id.split('-')

        if (action == 'editar') {
            const button = document.getElementById('enviar')
            button.textContent = 'Editar'
            button.value = codigo
            openModal()
            const customer = await readCustomerById(codigo)
            fillFormCustomer(customer)
        } else if (action == 'excluir') {
            await deleteCustomer(codigo)
            updateTable()
        }
    }
}

const clearForm = () => {

    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('cidade').value = ''

    const button = document.getElementById('enviar')
    button.textContent = 'Salvar'
    button.value = ''

}


updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('enviar').addEventListener('click', sendCustomers)
document.getElementById('customers-container').addEventListener('click', actionCustomer)