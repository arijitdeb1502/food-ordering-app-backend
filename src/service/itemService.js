const item=require('../db/model/item');
const restaurant=require('../db/model/restaurant');
const RestaurantNotFoundException=require('../errors/RestaurantNotFoundException');

const getItemsOfRestaurant = async (restaurant_id)=>{

    try{

        console.log(restaurant_id);
        const restaurantRef=await restaurant.findById(restaurant_id);

        if(!restaurantRef){
            throw new RestaurantNotFoundException("RNF-001","No restaurant by this id")
        }
    
        const items= await item.find({restaurant:restaurant_id});

        console.log(items)
    
        const itemRetFromService=items.map((item,index)=>{
            return{
                id: index+1,
                item_name: item.item_name,
                price: item.price,
                type: item.item_type
            }
        })
    
        return itemRetFromService;

    }catch(error){
        console.log('Something went wrong: itemService: getItemsOfRestaurant', error);

        throw new Error(error);
    }
    

}

module.exports={
    getItemsOfRestaurant:getItemsOfRestaurant
}