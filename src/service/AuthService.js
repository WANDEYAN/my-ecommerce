import router from '@/router';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {

  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  },
  (error) => {
    //console.log(error);
    router.push("/auth/login");
    throw new Error("Invalid authentication.");
  }
);
/**
@param email - String email of user
@param password- String password of user
@returns Boolean - true if login is successful, false otherwise
*/
export async function handlerLogin(email, password){
  try{
      const response = await apiClient.post("/auth/login", {email: email, password: password});
      const token = response.data.token;

      if(token){
          localStorage.setItem("authToken", token);
          console.log("Passou aqui no foi");
          return true;
        }
        console.log("Passou aqui no não foi");
        return false;
      }catch(error){
        if (error.response) {
          // O servidor respondeu com um código de status de erro (4xx, 5xx)
          console.error('Erro de Resposta do Servidor:', error.response.status);
          console.error('Dados do Erro:', error.response.data);
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida
          // Isso é quase sempre um problema de CORS ou rede.
          console.error('Nenhuma resposta recebida do servidor. Verifique a configuração de CORS no seu back-end e a conectividade.', error.request);
        } else {
          // Um erro ocorreu ao configurar a requisição
          console.error('Erro ao configurar a requisição:', error.message);
        }
      return false;
  }
}

export default apiClient;