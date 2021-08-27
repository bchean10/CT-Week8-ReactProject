import apiClient from './clientBasicAuth'


const endpointProduct = `/products`;
const endpointAllProducts = "/products?limit=15";
const endpointAllCat = "/products/categories";
const endpointSingleCat = "/products/category"

export const getProducts = async () =>{
    const response = await apiClient().get(endpointAllProducts);
    console.log("getProducts", response)
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data}
    return
}

export const getAllCat = async()=>{
    const response = await apiClient().get(endpointAllCat);
    console.log("getAllCat", response)
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status < 600){return 500;}
    if (response.ok){return response.data}
    return
}

export const getProduct = async (id) =>{
    const response = await apiClient().get(`${endpointProduct}/${id}`);
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status <600){return 500;}
    if (response.ok){ return response.data}
    return
}

export const getSingleCat = async (name) =>{
    const response = await apiClient().get(`${endpointSingleCat}/${name}`);
    console.log(response)
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status <600){return 500;}
    if (response.ok){ return response.data}
    return
}

export const postProduct = async (data) => {
    const response = await apiClient().post(endpointProduct, data);
    console.log(response)
    if (response.ok){return true}else{return false} 
};

export const patchProduct = async (id, data) => {
    const response = await apiClient().put(`${endpointProduct}/${id}`, data);
    if (response.ok){return true}else{return false} 
};

export const deleteProduct = async (id) => {
    const response = await apiClient().post(endpointProduct, {}, {data:{id}});
    if (response.ok){return true}else{return false} 
};
  