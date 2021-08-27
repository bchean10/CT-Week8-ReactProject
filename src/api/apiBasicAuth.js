import apiClient from "./clientBasicAuth";

const endpoint = "/auth/login";

const getToken = async(username, password) => {
    let response = await apiClient().post(endpoint, JSON.stringify({ username:username, password:password}));
    if (response.status === 401){return 401}
    if (!response.ok){return 500}
    if (response.ok){return response.data.token} 
    return
}

export default getToken;