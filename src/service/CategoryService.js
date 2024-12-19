export const CategoryService = {
    getMockData(){
        return [
            { "id": 1, "category": "Eletrônicos" },
            { "id": 2, "category": "Informática" },
            { "id": 3, "category": "Celulares e Tablets" },
            { "id": 4, "category": "Eletrodomésticos" },
            { "id": 5, "category": "Móveis" },
            { "id": 6, "category": "Roupas" },
            { "id": 7, "category": "Calçados" },
            { "id": 8, "category": "Esportes e Lazer" },
            { "id": 9, "category": "Livros e Papelaria" },
            { "id": 10, "category": "Brinquedos e Jogos" },
            { "id": 11, "category": "Beleza e Cuidados Pessoais" },
            { "id": 12, "category": "Saúde e Bem-Estar" },
            { "id": 13, "category": "Automotivo" },
            { "id": 14, "category": "Ferramentas e Construção" },
            { "id": 15, "category": "Casa e Decoração" },
            { "id": 16, "category": "Alimentos e Bebidas" },
            { "id": 17, "category": "Pet Shop" },
            { "id": 18, "category": "Relógios e Acessórios" },
            { "id": 19, "category": "Joias" },
            { "id": 20, "category": "Viagem e Turismo" }
          ]
    },

    getCategorys(){
        return Promise.resolve(this.getMockData());
    }
};