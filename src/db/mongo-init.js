db.auth('admin-user', 'admin-password')

db = db.getSiblingDB('weather')

db.createUser({
  user: 'devuser',
  pwd: 'devpass',
  roles: ["readWrite"]
});