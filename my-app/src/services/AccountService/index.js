import axios from 'axios'
import axiosJWT from '../../utils/axios.interceptor';
import delay from '../../utils/delay';

const baseURL = process.env.REACT_APP_API_URL;

async function signIn(username, password) {
    await delay(2000);
    const res = await axios.post(`${baseURL}/account/login`, {
        username,
        password
    });
    return res.data;
}

async function signUp(data) {
    await delay(2000);
    const res = await axios.post(`${baseURL}/account/register`, data);
    return res.data;
}

async function Auth() {
    const res = await axiosJWT.get(`${baseURL}/account/auth`);
    return res.data;
}
async function getAllAccount() {
    const res = await axiosJWT.get(`${baseURL}/account/all`);
    return res.data;
}



async function updateUser(data) {
    await delay(2000);
    const { acc_id } = data;
    const res = await axiosJWT.put(`${baseURL}/account/update/${acc_id}`, data);
    return res.data;
}

async function deleteAccount(acc_id) { 
    await delay(2000);
    const res = await axiosJWT.delete(`${baseURL}/account/delete/${acc_id}`);
    return res.data;
}


export const accountService = {
    signIn,
    signUp,
    getAllAccount,
    Auth, 
    updateUser,
    deleteAccount
}