const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
//include its associated Products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categories) {
      res.status(404).json({ message: "No categories found!" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categories) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json({ categories, message: "New category added!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (categories[0] === 1) {
      res.status(200).json({ message: "Category updated!" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Category updated failed!" });
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!categories) {
      res.status(404).json({ message: "No Category with this id!" });
      return;
    }
    res.status(200).json({ message: "Category deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
