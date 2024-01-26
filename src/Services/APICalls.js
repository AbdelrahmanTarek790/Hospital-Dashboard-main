import axios from "axios"

const baseURL = "https://erpsystem.pildextech.cf/api/v1"

export const postData = async (url, data, token) => {
    let result = {}
    await axios
        .post(`${baseURL}${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            result = res
        })
        .catch((e) => {
            result = e.response
        })
    return result
}

export const getData = async (url, token) => {
    let result = {}
    await axios
        .get(`${baseURL}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            result = res
        })
        .catch((e) => {
            result = e.response
        })
    return result
}

export const updateData = async (url, data, token) => {
    let result = {}
    await axios
        .put(`${baseURL}${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            result = res
        })
        .catch((e) => {
            result = e.response
        })
    return result
}

export const deleteData = async (url, token) => {
    let result = {}
    await axios
        .delete(`${baseURL}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            result = res
        })
        .catch((e) => {
            result = e.response
        })
    return result
}

export const addOperation = async (token, data) => {
    let result = {}
    await axios
        .post(`${baseURL}/orders/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            result = res
        })
        .catch((e) => {
            result = e.response
        })
    return result
}

export const getOperationCommands = async (id) => {
    let results = {}
    await axios
        .get(`https://erpsystem.pildextech.cf/api/v1/devices/institution/${id}`)
        .then((res) => {
            results = res
        })
        .catch((e) => {
            results = e
        })
    return results
}
