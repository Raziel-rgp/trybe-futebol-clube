import Users from '../models/Users.model';

const findAllUsers = async () => {
  const users = await Users.findAll();
  return users;
};

export default { findAllUsers };
