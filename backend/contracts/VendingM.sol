contract VendingM {
    struct Product {
        uint quantity;
        uint place;
        string name;
        //price is multiplied by 1000
        uint price;
        string description;

    }
    uint public productIndex=0;
    event BuyProduct(uint id,uint quantity,uint place,string name,uint price,string description);
    event QuantityZero(string name, uint id);
    mapping(uint  => Product) allProducts;

    function addProduct(uint _quantity,uint _place,string _name,uint _price,string _description){
        allProducts[productIndex] =  Product(_quantity,_place,_name,_price,_description);
        productIndex++;

    }
    function buyProduct(uint id){
        if(allProducts[id].quantity == 0){
        QuantityZero(allProducts[id].name,id);
        }else{
            allProducts[id].quantity--;
            BuyProduct(id,allProducts[id].quantity,allProducts[id].place,allProducts[id].name,allProducts[id].price,allProducts[id].description);
        }


    }
    function getProduct(uint id) returns(uint quantity,uint palce,string name,uint price,string description){
        return (allProducts[id].quantity,allProducts[id].place,allProducts[id].name,allProducts[id].price,allProducts[id].description);
    }


}




