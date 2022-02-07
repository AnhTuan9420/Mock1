const Sequelize = require('sequelize');

const db = new Sequelize('dev', 'postgres', 'vutuan113', {
    host: 'localhost',
    dialect: 'postgres',
});
const auth = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
auth();
db.sync();
module.exports = db;