const fs = require('fs')
const path = require('path')

module.exports = app => {
    fs.readdirSync(__dirname)
    .filter(item => {
        return item.indexOf('.') != 0 && (item != 'index.js')
    }).forEach(item => {
        require(path.resolve(__dirname,item))(app)
    })
}