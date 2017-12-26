module.exports = {
    plugins: [
        require('posthtml-include')({ root: './src/templates/includes'}),
        require('posthtml-expressions')({locals: { test: 'Hello World!'} }),
    ]
};