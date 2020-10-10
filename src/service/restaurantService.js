const mongoose = require('mongoose');
const Restaurant = require('../db/model/restaurant');
const Category = require('../db/model/category');
const RestaurantNotFoundException=require('../errors/RestaurantNotFoundException');
const CategoryNotFoundException=require('../errors/CategoryNotFoundException'); 

const getAllRestaurants = async()=>{

    try{

      const restaurants=await Restaurant.find({});

      const populatesRestaurants=[];
      for(let restaurant of restaurants){
        
        let restaurantResp={};
        
        await restaurant.populate('address').execPopulate();
        await restaurant.populate('categories').execPopulate();
        await restaurant.populate('address.state').execPopulate();
        
        let populateCategories="";
        for(let category of restaurant.categories){
          populateCategories=populateCategories+category.category_name+",";
        }

        let {_id,flat_building_name,locality,city,pincode,state}=restaurant.address;
        restaurantResp.id=restaurant._id;
        restaurantResp.restaurant_name=restaurant.restaurant_name;
        restaurantResp.photo_URL=restaurant.photo_URL;
        restaurantResp.customer_rating=restaurant.customer_rating;
        restaurantResp.average_price=restaurant.average_price;
        restaurantResp.number_customers_rated=restaurant.number_customers_rated;
        restaurantResp.address={_id,flat_building_name,locality,city,pincode,state};
        restaurantResp.categories=populateCategories.replace(/,$/,"");

        populatesRestaurants.push(restaurantResp);
      }
    
      return populatesRestaurants;

    }catch(error){
      
      console.log('Something went wrong: restaurantService: getAllRestaurants', error);
      throw new Error(error);

    }

}

const getResataurantByName=async(restaurant_name)=>{
  
  
  try{

    const restaurants=await Restaurant.find({})

    const populatesRestaurants=[];
      for(let restaurant of restaurants){
        
        let restaurantResp={};
        
        await restaurant.populate('address').execPopulate();
        await restaurant.populate('categories').execPopulate();
        await restaurant.populate('address.state').execPopulate();
        
        let populateCategories="";
        for(let category of restaurant.categories){
          populateCategories=populateCategories+category.category_name+",";
        }

        let {_id,flat_building_name,locality,city,pincode,state}=restaurant.address;
        restaurantResp.id=restaurant._id;
        restaurantResp.restaurant_name=restaurant.restaurant_name;
        restaurantResp.photo_URL=restaurant.photo_URL;
        restaurantResp.customer_rating=restaurant.customer_rating;
        restaurantResp.average_price=restaurant.average_price;
        restaurantResp.number_customers_rated=restaurant.number_customers_rated;
        restaurantResp.address={_id,flat_building_name,locality,city,pincode,state};
        restaurantResp.categories=populateCategories.replace(/,$/,"");

        populatesRestaurants.push(restaurantResp);
      }

      const filteredRestaurants=populatesRestaurants.filter((restaurant)=>{
        return restaurant.restaurant_name.toLowerCase().includes(restaurant_name.toLowerCase());
     })

     if(filteredRestaurants.length===0){
      throw new RestaurantNotFoundException('RNF-003','No Reataurant found by that Name!');
     }
    
     return filteredRestaurants;

  }catch(error){
    console.log('Something went wrong: restaurantService: getRestaurantByName', error);
    throw new Error(error);
  }
}

const getRestaurantsByCategoryId = async(category_id)=>{


  const category=await Category.findById(category_id);

  if(!category){
      throw new CategoryNotFoundException("CNF-002","No category by this id");
  }

  const restaurants=await Restaurant.find({})

    const populatesRestaurants=[];
      for(let restaurant of restaurants){
        
        let restaurantResp={};
        
        await restaurant.populate('address').execPopulate();
        await restaurant.populate('categories').execPopulate();
        await restaurant.populate('address.state').execPopulate();
        
        let populateCategories="";
        for(let category of restaurant.categories){
          populateCategories=populateCategories+category.category_name+",";
        }

        let {_id,flat_building_name,locality,city,pincode,state}=restaurant.address;
        restaurantResp.id=restaurant._id;
        restaurantResp.restaurant_name=restaurant.restaurant_name;
        restaurantResp.photo_URL=restaurant.photo_URL;
        restaurantResp.customer_rating=restaurant.customer_rating;
        restaurantResp.average_price=restaurant.average_price;
        restaurantResp.number_customers_rated=restaurant.number_customers_rated;
        restaurantResp.address={_id,flat_building_name,locality,city,pincode,state};
        restaurantResp.categories=populateCategories.replace(/,$/,"");

        populatesRestaurants.push(restaurantResp);
      }


      const filteredRestaurants=populatesRestaurants.filter((restaurant)=>{
        return restaurant.categories.includes(category.category_name);
     });

     return filteredRestaurants;

}

module.exports = {
    getAllRestaurants: getAllRestaurants,
    getResataurantByName: getResataurantByName,
    getRestaurantsByCategoryId:getRestaurantsByCategoryId
}