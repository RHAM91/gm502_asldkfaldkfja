module.exports = {
    //IP: '26.159.120.106', // pc
    //IP: '25.100.43.219', // mac
    IP: process.env.NODE_ENV == 'development' ? 'api.kovu.red' : '157.230.60.183', // VPS GUATEMUSICA
    PUERTO: 3005
}