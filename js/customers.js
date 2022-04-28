'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

// Consumindo a api
const readCustomers = async() => {

    const response = await fetch(url)
    return await response.json()

}

export const readCustomerById = async(codigo) => {

    const response = await fetch(`${url}/${codigo}`)
    return await response.json()

}

export const fillFormCustomer = (customer) => {

    const inputName = document.getElementById('nome')
    const inputEmail = document.getElementById('email')
    const inputPhone = document.getElementById('celular')
    const inputCity = document.getElementById('cidade')

    inputName.value = customer.nome
    inputEmail.value = customer.email
    inputPhone.value = customer.celular
    inputCity.value = customer.cidade

}

const createCustomers = async(customers) => {

    const options = {
        method: 'POST',
        body: JSON.stringify(customers),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url,options)
    console.log(response.ok)
}

export const updateCustomer = async(customer) => {

    const options = {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(`${url}/${customer.id}`, options)
    console.log(response.ok)
}

const deleteCustomer = async(codigo) => {

    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
    console.log(response.ok)

}

export {
    readCustomers,
    createCustomers,
    deleteCustomer,
}