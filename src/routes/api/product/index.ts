import create from './handlers/create_product';
import index from './handlers/all_products';
import getProduct from './handlers/show_product';
import updateProduct from './handlers/update_product';
import deleteProduct from './handlers/delete_product';

export default { create, index, getProduct, updateProduct, deleteProduct };
