'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

// Consumindo a api
export const readCustomers = async(id='') => {

    const response = await fetch(`${url}/${id}`)
    return await response.json()

}

export const createCustomers = async(customers) => {

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

export const deleteCustomer = async(codigo) => {

    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
    console.log(response.ok)

}
