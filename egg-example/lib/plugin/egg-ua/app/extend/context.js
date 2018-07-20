module.exports = {
    get isIOS(){
        const iosReg = /ipad|iphone|ipod/i;
        return iosReg.test(this.get('use-agent'))
    }
}