const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// POST /api/products - Seed products (This would be run once to populate the DB)
router.post('/seed', async (req, res) => {
  const products = [
    {
      name: "Unstitched Ladies Suit",
      category: "Unstitched",
      description: "Beautiful unstitched cotton suit with vibrant colors.",
      price: 1200,
      image: "https://www.kiransboutique.com/wp-content/uploads/2021/12/1712094629989_Bittersweet-printed-unstitched-ladies-cotton-suit-with-chiffon-dupatta.jpeg"
    },
    {
      name: "Unstitched Ladies Suit",
      category: "Unstitched",
      description: "Beautiful unstitched cotton suit with vibrant colors.",
      price: 1200,
      image: "https://www.textileinfomedia.com/img/dpoi/ladies-cotton-party-wear-unstitched-salwar-suit-full.jpeg"
    },
    {
      name: "Unstitched Ladies Suit",
      category: "Unstitched",
      description: "Beautiful unstitched cotton suit with vibrant colors.",
      price: 1200,
      image: "https://www.kiransboutique.com/wp-content/uploads/2021/12/1680172408823_Pear-green-unstitched-hand-block-printed-chiffon-dupatta-cotton-ladies-suit-design.jpeg"
    },
    {
      name: "Unstitched Ladies Suit",
      category: "Unstitched",
      description: "Beautiful unstitched cotton suit with vibrant colors.",
      price: 1200,
      image: "https://www.kiransboutique.com/wp-content/uploads/2021/12/1690327835793_Blue-Regent-ladies-unstitched-suits-online-india-with-cotton-dupatta.jpeg"
    },
    {
      name: "Unstitched Ladies Suit",
      category: "Unstitched",
      description: "Beautiful unstitched cotton suit with vibrant colors.",
      price: 1200,
      image: "https://s.alicdn.com/@sc04/kf/A603f9adf922b4f41b45e1b169cb08c4bt.jpg_300x300.jpg"
    },
    {
      name: "Stitched Anarkali Suit",
      category: "Stitched",
      description: "Elegant Anarkali suit with golden embroidery.",
      price: 2500,
      image: "https://myfashionroad.com/wp-content/uploads/2023/05/omtex-erin-pure-chiffon-branded-partywear-ladies-suit-online-wholesaler-2-2023-04-27_12_40_28_1.jpeg"
    },
    {
      name: "Stitched Anarkali Suit",
      category: "Stitched",
      description: "Elegant Anarkali suit with golden embroidery.",
      price: 2500,
      image: "https://img0.junaroad.com/uiproducts/19808741/zoom_0-1683301416.jpg"
    },
    {
      name: "Stitched Anarkali Suit",
      category: "Stitched",
      description: "Elegant Anarkali suit with golden embroidery.",
      price: 2500,
      image: "https://www.jaipuriadaah.com/cdn/shop/files/DSC_4857copy_1_600x.jpg?v=1714711250"
    },
    {
      name: "Stitched Anarkali Suit",
      category: "Stitched",
      description: "Elegant Anarkali suit with golden embroidery.",
      price: 2500,
      image: "https://www.jaipuriadaah.com/cdn/shop/files/DSC_2980copy_da878c90-a58c-4960-92e1-0b6d79ab2759_600x.jpg?v=1714717071"
    },
    {
      name: "Stitched Anarkali Suit",
      category: "Stitched",
      description: "Elegant Anarkali suit with golden embroidery.",
      price: 2500,
      image: "https://stilento.com/cdn/shop/files/L2-1.jpg?v=1694607155"
    },
    {
      name: "Designer Gown",
      category: "Gown",
      description: "Floor-length designer gown with intricate beadwork.",
      price: 4500,
      image: "https://5.imimg.com/data5/SELLER/Default/2022/8/OR/VX/NZ/144909617/ladies-designer-unstitched-suits.jpg"
    },
    {
      name: "Party Wear Gown",
      category: "Gown",
      description: "Stylish party wear gown perfect for weddings.",
      price: 3000,
      image: "https://stilento.com/cdn/shop/files/light-brown-embroidered-cotton-un-stitched-suit-set.jpg?v=1683981240"
    },
    {
      name: "Designer Gown",
      category: "Gown",
      description: "Floor-length designer gown with intricate beadwork.",
      price: 4500,
      image: "https://gloriousavenue.com/cdn/shop/products/71SAZXVlE4L.jpg?v=1709661824&width=533"
    },
    {
      name: "Party Wear Gown",
      category: "Gown",
      description: "Stylish party wear gown perfect for weddings.",
      price: 3000,
      image: "https://textildealcdn.sgp1.cdn.digitaloceanspaces.com/uploads/1677325810-SURYAJYOTI-KHANAK-VOL-3-JAAM-SATIN-UNSTITCHED-DRESS-SUITS-FOR-LADIES-1.jpg"
    },
    {
      name: "Party Wear Gown",
      category: "Gown",
      description: "Stylish party wear gown perfect for weddings.",
      price: 3000,
      image: "https://images.jdmagicbox.com/quickquotes/images_main/women-s-embroidered-unstitched-dress-material-with-dupatta-suit-2029638427-ypide7av.jpg"
    }
  ];

  try {
    await Product.insertMany(products);
    res.status(201).json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to seed products', error });
  }
});

module.exports = router;
