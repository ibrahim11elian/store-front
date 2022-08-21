import create from './handlers/create_order';
import index from './handlers/all_orders';
import getOrder from './handlers/show_order';
import updateOrder from './handlers/update_order';
import deleteOrder from './handlers/delete_order';

export default { create, index, getOrder, updateOrder, deleteOrder };
