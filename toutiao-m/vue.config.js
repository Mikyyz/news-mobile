module.exports = {
    css: {
        loaderOptions: {
            less: {
                globalVars: {
                    hack: `true; @import '~@/assets/css/base.less';`
                }
            }
        }
    }
};