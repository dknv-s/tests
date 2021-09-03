module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/tests/'
        : '/',
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             additionalData: `@import "@/assets/main.scss";`
    //         }
    //     }
    // }
};