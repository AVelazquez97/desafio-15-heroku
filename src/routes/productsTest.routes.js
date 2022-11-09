import { Router } from 'express';
import ProductFakerMock from '../mocks/productFakerMock.js';

const router = Router();

router.get('/productos-test', (req, res) => {
  const fakeProducts = new ProductFakerMock();
  const products = fakeProducts.populateProducts(5);
  res.status(200).render('partials/viewFakeProducts', {
    products,
    existProducts: products.length,
  });
});

export default router;
