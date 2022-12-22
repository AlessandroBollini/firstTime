const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://bollini:jm9g42N53mLmVpsoBCRjiDnAWvS6GzoE@dpg-cei80hcgqg4e0e8lro0g-a/envisioning');

/**const sequelize = new Sequelize('envisioningv2', 'bollini', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});*/

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

class Users extends Model { }
Users.init({
    wallet: {
        type: DataTypes.STRING,
        unique:true
    },
    email: {
        type: DataTypes.STRING
    },
    level:{
        type:DataTypes.STRING
    }
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: false });
})();

module.exports.Users = Users;
