/**
 * Created by think on 2017/5/13.
 */
const Sequelize = require("sequelize")
const sqlOpt = require("./../conf/mysql")
const uuidV4 = require("uuid/v4")
let sequelize = new Sequelize('myblog', sqlOpt.name, sqlOpt.pwd, {
    host: sqlOpt.host,
    dialect: 'mysql',
    port: sqlOpt.port,
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});
let user = sequelize.define(
    'user',
    {
        user_name: Sequelize.STRING,
        user_pwd: Sequelize.STRING,
        user_auth: Sequelize.INTEGER,
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })

module.exports = {
    search(params){
        return user.findAll({
            where: {
                user_name: params.name,
                user_pwd: params.pwd
            }
        })
    },
    add(params){
        return user.create({
            user_name: params.name,
            user_pwd: params.pwd,
            user_id: uuidV4(),
            user_auth: 2
        })
    },
    deleteUser(params){
        return user.destroy({
            where: {
                user_name: params.name
            }
        });
    },
    update(params){
        return user.update(
            {
                user_pwd: params.newPwd
            }, {
                where: {
                    user_name: params.name
                }
            })
    }
}