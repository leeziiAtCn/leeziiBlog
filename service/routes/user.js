const express = require("express")
let user_m = require("./../model/user")
let user_api = express.Router()


user_api.post('/login', (req, res) => {
    if (req.body.username && req.body.userpwd) {
        user_m.search({
            name: req.body.username,
            pwd: req.body.userpwd
        }).then((result) => {
            resJson(result.length, res)
        })
    } else {
        res.json({
            code: 0,
            msg: '失败'
        })
    }

})
user_api.post('/add', (req, res) => {
    if (req.body.username && req.body.userpwd) {
        user_m.search({
            name: req.body.username,
            pwd: req.body.userpwd
        }).then((result) => {
            if (!!!result.length) {
                user_m.add({
                    name: req.body.username,
                    pwd: req.body.userpwd
                }).then(result => {
                    resJson(result.dataValues.user_name === req.body.username, res)
                })
            } else {
                res.json({
                    code: 3,
                    msg: '用户存在'
                })
            }
        })
    }
})
user_api.post('/update', (req, res) => {
    if (req.body.username && req.body.userpwd && req.body.newPwd) {
        user_m.search({
            name: req.body.username,
            pwd: req.body.userpwd
        }).then((result) => {
            if (!!result.length) {
                user_m.update({
                    name: req.body.username,
                    newPwd: req.body.newPwd
                }).then((result) => {
                    resJson(result.length, res)
                })
            } else {
                res.json({
                    code: 0,
                    msg: '用户信息异常'
                })
            }
        })
    } else {
        res.json({
            code: 3,
            msg: '缺少参数'
        })
    }
})
user_api.post('/delete', (req, res) => {
    user_m.search({
        name: req.body.username,
        pwd: req.body.userpwd
    }).then((result) => {
        if (!!result.length) {
            user_m.deleteUser({
                name: req.body.username
            }).then(() => {
                resJson(true, res)
            })
        } else {
            res.json({
                code: 3,
                msg: '用户不存在'
            })
        }
    })
})
function resJson(flag, res) {
    if (!!flag) {
        res.json({
            code: 1,
            msg: "成功"
        })
    } else {
        res.json({
            code: 0,
            msg: '失败'
        })
    }

}
module.exports = user_api