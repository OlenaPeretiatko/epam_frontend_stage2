const path = require('path')

module.exports = {
    devtool: "source-map",
    mode: "development",
    entry: '/homework/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }
}