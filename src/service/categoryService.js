const Category = require('../db/model/category');
const Item = require('../db/model/item');

const CategoryNotFountException = require('../errors/CategoryNotFoundException');

const getAllCategories = async()=>{

    try{
        
        const categories=await Category.find();
        return categories;

    }catch(error){
        throw new Error(error);
    }
    
}

const getItemsByCategoryId = async(cat_id)=>{

    const respFromService={}

    try{
        
        const category=await Category.findById(cat_id);

        if(!category){
            throw new CategoryNotFountException("CNF-001","No category by this id");
        }

        const items=await Item.find({ category: cat_id});

        const itemArray=items.map((item)=>{

            return {
                id: item._id,
                item_name: item.item_name,
                price: item.price,
                item_type: item.item_type
            }

        })
  
        respFromService.id=category._id;
        respFromService.category_name=category.category_name;
        respFromService.item_list=itemArray;

        return respFromService;

    }catch(error){
        throw new Error(error);
    }

}

module.exports = {
    getAllCategories: getAllCategories,
    getItemsByCategoryId: getItemsByCategoryId
}