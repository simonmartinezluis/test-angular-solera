export const environment = {
  production: true,
  backend: {
    path: 'https://young-sands-07814.herokuapp.com',
    apis: {
      productList: '/api/products',
      productSave: '/api/products',
      productId: '/api/products/{id}',
      productUpdate: '/api/products/{id}',
      productDelete: '/api/products/{id}',
      productsByCategory: '/api/categories/',
      deleteProduct: '/api/products/',

      categories: '/api/categories',

      users: '/api/users',
      usersSave: '/api/users'
    }
  }
};
