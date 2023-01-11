const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
try {
  const dbTagData = await Tag.findAll({
    include:[
      {
        model: Product
      }
    ],
  });
  res.status(200).json(dbTagData);
}catch(err){
  res.status(500).json(err);
}
});

// find a single tag by its `id`be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const dbTagData=await Tag.findByPk(req.params.id, {
      include: [
        {
          model:Product
        }
      ],
    });
    res.status(200).json(dbTagData);
    }catch(err){
      res.status(500).json(err);
    }
  });

  // create a new tag
router.post('/', async (req, res) => {
  try{
    const dbTagData= await Tag.create(
      {
        tag_name:req.body.name,
      }
    );
    res.status(200).json(dbTagData);
  }catch(err){
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.update({
      tag_name: req.body.name
    }, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    return res.status(200).json(dbTagData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
