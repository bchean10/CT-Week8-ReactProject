import {create} from 'apisauce';

const data = {"username": "mor_2314", "password": "83r5^_"}

const apiClientWithToken = () => create({
    baseURL: "https://fakestoreapi.com/",
    headers:{
        'Content-Type':'application/json'
    },
    data
})

export default apiClientWithToken;