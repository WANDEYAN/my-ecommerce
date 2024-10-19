export const RatingService = {
    getRatingData(){
        return [
            {
                id: '1',
                name: 'Michael Jordan',
                description: 'Mano, sério, esse produto é top demais! Valeu pela recomendação.',
                rating: 5
            },
            {
                id: '2',
                name: 'LeBron James',
                description: 'Cara, você mandou bem demais! Tô curtindo muito esse produto.',
                rating: 4
            },
            {
                id: '3',
                name: 'Kareem Abdul-Jabbar',
                description: 'Irmão, esse produto é bom, mas achei que poderia ser um pouco melhor. Valeu a tentativa!',
                rating: 3
            },
            {
                id: '4',
                name: 'Magic Johnson',
                description: 'Esse aqui me surpreendeu, meu parceiro! Boa dica, gostei muito!',
                rating: 5
            },
            {
                id: '5',
                name: 'Larry Bird',
                description: 'Você sempre me recomenda coisa boa, hein? Esse produto é show!',
                rating: 4
            },
            {
                id: '6',
                name: 'Shaquille O’Neal',
                description: 'Rapaz, você não erra uma, hein? Produto incrível! Valeu!',
                rating: 5
            },
            {
                id: '7',
                name: 'Tim Duncan',
                description: 'Gostei, mano, mas achei que podia ser um pouco mais resistente. Mas tá valendo!',
                rating: 3
            },
            {
                id: '8',
                name: 'Kobe Bryant',
                description: 'Isso sim é dica de irmão, gostei demais desse produto! Boa!',
                rating: 5
            },
            {
                id: '9',
                name: 'Wilt Chamberlain',
                description: 'Não é o melhor que já comprei, mas pelo preço tá legal. Valeu pela dica!',
                rating: 2
            },
            {
                id: '10',
                name: 'Bill Russell',
                description: 'Cara, você sempre acerta nas sugestões. Produto excelente!',
                rating: 4
            },
            {
                id: '11',
                name: 'Hakeem Olajuwon',
                description: 'Top demais, mano! Esse produto tá me salvando no dia a dia.',
                rating: 5
            },
            {
                id: '12',
                name: 'Stephen Curry',
                description: 'Esse aqui foi uma boa compra, curti demais! Valeu, bro!',
                rating: 4
            }            
        ]
    },

    getRatings() {
        return Promise.resolve(this.getRatingData())
    }
};