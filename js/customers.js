'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

// Consumindo a api
const readCustomers = async() => {

    const response = await fetch(url)
    return await response.json()

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
    deleteCustomer
}