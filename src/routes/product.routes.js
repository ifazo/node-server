import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const productRoutes = async (req, res) => {
  // Get all products
  if (req.url === '/api/products' && req.method === 'GET') {
    const products = await getAllProducts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } 
  // Create a new product
  else if (req.url === '/api/products' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const product = JSON.parse(body);
      const newProduct = await createProduct(product);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newProduct));
    });
  } 
  // Get product by ID
  else if (req.url && req.url.match(/\/api\/products\/([0-9a-fA-F-]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    const product = await getProductById(id);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }
  }
  // Update product by ID
   else if (req.url && req.url.match(/\/api\/products\/([0-9a-fA-F-]+)/) && req.method === 'PATCH') {
    const id = req.url.split('/')[3];
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const updatedData = JSON.parse(body);
      const updatedProduct = await updateProduct(id, updatedData);
      if (updatedProduct) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedProduct));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    });
  }
  // Delete product by ID
   else if (req.url && req.url.match(/\/api\/products\/([0-9a-fA-F-]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    const deletedProduct = await deleteProduct(id);
    if (deletedProduct) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedProduct));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }
  }
};

export { productRoutes };
