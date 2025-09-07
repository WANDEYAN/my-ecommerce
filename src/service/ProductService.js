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
            console.log("Error searching for products",error)
        }
    }
};
