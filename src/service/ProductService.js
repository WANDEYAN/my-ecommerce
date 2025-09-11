import router from "@/router";
import apiClient from "./AuthService";

export const ProductService = {
    async getProducts({page = 0, size = 10, sort ='id,asc'} = {}) {  
        try{
            const response = await apiClient.get("/products", {
                params: {
                page: page,
                size: size,
                sort: sort}
              });
            return response.data.content;
        }catch(error){
            errorHandler(error);
        }
    },
    async getProductById(id){
        try{
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        }catch(error){
            errorHandler(error);
        }
    }
};

function errorHandler(error){
    if(error.response){
        console.log("Error searching for products",error);
        const status = error.response.status;
        if(status === 403 || status === 401){
            console.log("error 403 or 401");
            router.push("/auth/login");
        }else{
            router.push({path: "/auth/error", query: {status: status}});
        }
    }else{
        console.log("Error searching for products",error);
        router.push({path: "/auth/error", query: {status: "NETWORK_ERROR"}});
    }
}
