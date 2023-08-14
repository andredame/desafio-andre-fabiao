class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if(itens.length === 0)return "Não há itens no carrinho de compra!";//Verifica se não foi passado nada no array de itens
        
        //Cria o Cardapio e Adiciona os produtos ao Cardapio
        const cardapioLanchonete= new Cardapio();
        
        cardapioLanchonete.adicionarProduto('cafe', 'Café',  3.00);
        cardapioLanchonete.adicionarProduto('chantily', 'Chantily (extra do Café)',  1.50);
        cardapioLanchonete.adicionarProduto('suco', 'Suco Natural',  6.20);
        cardapioLanchonete.adicionarProduto('sanduiche', 'Sanduíche',  6.50);
        cardapioLanchonete.adicionarProduto('queijo', 'Queijo (extra do Sanduíche)',  2.00);
        cardapioLanchonete.adicionarProduto('salgado', 'Salgado',  7.25);
        cardapioLanchonete.adicionarProduto('combo1', '1 Suco e 1 Sanduíche',  9.50);
        cardapioLanchonete.adicionarProduto('combo2', '1 Café e 1 Sanduíche',  7.50);



        let valorFinal=0;
        let produtosCliente=[];
        let prodAux;
        let quantidadeItem=[];
        //processa os itens do pedido
        for (const item of itens){
            const[auxItem,auxQuantidade]= item.split(',');
            prodAux=cardapioLanchonete.verificarProdutoNoCardapio(auxItem); //verifica se existe um objeto no cardapio igual ao codigo passado, se nao existe é undefined.
            if (prodAux === undefined) { //retorna um erro 
                return "Item inválido!";
            }
            //Se a quantidade do produto é 0, retorna erro
            if(parseInt(auxQuantidade) == 0){
                return "Quantidade inválida!";
            }


            quantidadeItem.push(parseInt(auxQuantidade)); // adiciona a quantidade de produtos em um array
            produtosCliente.push(prodAux); // adiciona o produtos em um array
            
        }
        
        if(!this.verificarProdutoEspecial(produtosCliente)){ //retorna erro
            return "Item extra não pode ser pedido sem o principal"
        }

        if(!this.metodoPagamentoValido(metodoDePagamento))return"Forma de pagamento inválida!";

        //Faz o calculo do valor final sem o metodo de pagamento, somente o valor do produto Vezes a sua quantidade.
        for(let i=0;i<produtosCliente.length;i++){
            valorFinal+= produtosCliente[i].preco*quantidadeItem[i];
        }

        //Faz o calculo do valor final de acordo com o metodo de pagamento
        if (metodoDePagamento === 'credito') {
            return 'R$ ' + (valorFinal * 1.03).toFixed(2).replace('.', ',');
        } else if (metodoDePagamento === 'dinheiro') {
            return 'R$ ' + (valorFinal * 0.95).toFixed(2).replace('.', ',');
        }
        return 'R$ ' + valorFinal.toFixed(2).replace('.', ',');

        
    }
    /**
     * Verifica se o método de pagamento é válido.
     * @param {string} metodoDePagamento - O método de pagamento a ser verificado.
     * @returns {boolean} True se o método de pagamento for válido, caso contrário false.
     */
    metodoPagamentoValido(metodoDePagamento){
        return metodoDePagamento === 'debito' || metodoDePagamento === 'credito' || metodoDePagamento === 'dinheiro';
    }



    /**
     * Verifica se o método de pagamento é válido.
     * @param {string} metodoDePagamento - O método de pagamento a ser verificado.
     * @returns {boolean} True se o método de pagamento for válido, caso contrário false.
     */
    verificarProdutoEspecial(produtos) {
        if (produtos.some(produto => produto.codigo === 'chantily')) {
            if (!produtos.some(produto => produto.codigo === 'cafe')) {
                return false;
            }
        }
        if (produtos.some(produto => produto.codigo === 'queijo')) {
            if (!produtos.some(produto => produto.codigo === 'sanduiche')) {
                return false;
            }
        }
        return true;
    }
    

}


//Classe que representa o cardapio
class Cardapio{
    constructor(){
        this.produtos=[]; //array com os produtos do cardapio 
    }
    /**
     * Método para adicionar um produto no cardapio
     * @param {string} codigo codigo do produto
     * @param {string} descricao descricao do produto    
     * @param {double} preco preco do produto
     */
    adicionarProduto(codigo,descricao,preco){
        let novoProduto;
        novoProduto = new Produto (codigo,descricao,preco);
        this.produtos.push(novoProduto);
        
    }
    /**
     * Metódo para verificar se existe um produto de acordo com o seu codigo 
     * @param {string} codigo codigo para fazer a verificação 
     * @returns true se existe, false nao existe 
     */
    verificarProdutoNoCardapio(codigo) {
        return this.produtos.find(produto => produto.codigo === codigo);
    }
    
}
//Classe que representa somente o produto com seus Atributos
class Produto{
    constructor(codigo,descricao,preco,especial){
        this.codigo=codigo;
        this.descricao=descricao;
        this.preco=preco;
    }
    
}

export { CaixaDaLanchonete };







