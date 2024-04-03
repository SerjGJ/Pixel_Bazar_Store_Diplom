const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles')

// register

async function register(login, password) {
    if (!password) {
        throw new Error('Password is empty');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ login, password: passwordHash })
    const token = generate({ id: user.id });

    return { user, token };
}

// login

async function login(login, password) {
    const user = await User.findOne({ login });

    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Wrong password')
    }

    const token = generate({ id: user.id });

    return { token, user };
}

function getUsers() {
    return User.find();
}

function getRoles() {
    return [
        { id: ROLES.ADMIN, name: 'Admin' },
        { id: ROLES.MODERATOR, name: 'Moderator' },
        { id: ROLES.USER, name: 'User' },
    ]
}

// delete

function deleteUser(id) {
    return User.deleteOne({ _id: id })
}

// edit (roles)
function updateUser(id, userData) {
    return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
}

module.exports = {
    register,
    login,
    getUsers,
    getRoles,
    deleteUser,
    updateUser
}