import create from './handlers/create_user';
import index from './handlers/all_users';
import getUser from './handlers/show_user';
import updateUser from './handlers/update_user';
import deleteUser from './handlers/delete_user';

export default { create, index, getUser, updateUser, deleteUser };
