const router = require('express').Router();
const { where } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products

router.get('/',async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product
        },
      ],
    });
    res.status(200).json(dbCategoryData);
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }  
  }
);

// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
try {
  const dbCategoryData =await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product
      }
    ]
  });
  if(!dbCategoryData){
    res.status(404).json({message: "There was no category found for this id."});
    return;
  }
  res.status(200).json(dbCategoryData);
}catch(err){
  res.status(500).json(err);
}
});

// create a new category
router.post('/', async(req, res) => {
  try{
    const dbCategoryData= await Category.create({
      name: req.body.name,
    });
    res.status(200).json(dbCategoryData);
  }catch(err){
    res.status(400).json(err);
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const dbCategoryData= await Category.update({
name: req.body.name
    }, {
    where:{
      id: req.params.id,
    },
  })
  res.status(200).json(dbCategoryData);
}catch(err){
  res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const dbCategoryData = await Category.destroy({
      where:{
        id: req.params.id,
      }
    })
    return res.status(200).json(dbCategoryData)
  }catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
