import {create} from 'apisauce';

const apiClient = () => create({
    baseURL:"https://fakestoreapi.com"
});

export default apiClient;