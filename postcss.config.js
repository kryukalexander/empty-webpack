module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {},
        'postcss-flexbugs-fixes' : {},
        'postcss-assets': {},
        'postcss-at2x' : {},
        'postcss-sprites': {
            retina: false,
            spritePath: 'src/images/',
            spritesmith: { padding: 5 },
            filterBy: (image) => {
                if (!/\/images-sprite\//.test(image.url)) {
                    return Promise.reject();
                }
                return Promise.resolve();
            }
        },
        'cssnano' : {}
    },
};