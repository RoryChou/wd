/**
 * 接口控制列表
 */

// import common from './common'

// let lvsessionid,
//     appKey,
//     userid,
//     sign,
//     agent = navigator.userAgent,
//     timestamp;

// // 本地测试
// let isLocal = false;

// timestamp = isLocal ? '123456789' : new Date().getTime();

// let secret;
// if(agent.indexOf('fangzhen')!=-1){
//     secret='7ac4e884c99fcc5cd303d8b3e8ab3f94';//仿真
// }else {

//     secret='2de70ec7107a7ff37ab87a5ef1107e49';

// }
// sign = isLocal ? '099dfb06801d398aeae73f405f3f9fdf' : md5.createHash(secret+timestamp+secret);


// const Host = "https://m.yobab2b.com";
// const Host = "http://10.200.5.140:15718";
// const Host = "http://10.112.5.33:8082/weshopclient";
// const Host = "http://10.200.5.119:8082/weshopclient";
// const Host = "http://10.112.1.86:8082/weshopclient";
// const Host = "http://1s960h2139.51mypc.cn/weshopclient";
const Host = '/weshopclient'
export default {
    // 微店首页接口
    weshopHome: {
        getStoreInfo: Host + '/ws/getStoreInfo',
        getAdvertise: Host + '/ws/getAdvertise',
        getHotSale: Host + '/ws/getHotSale',
        getRecommendList: Host + '/ws/getRecommendList',
        getRecommendCategoryTypes: Host + '/ws/getRecommendCategoryTypes',
        getRecommendProds: Host + '/ws/getRecommendProds'
    },
    myHome: {
        loadMember: Host + '/member/index',
        loadVisitor: Host + '/visitor/list',
        saveFromRoute: Host + '/member/fromRoute',
    },
    bindMobile: {
        sendMobileAuthCode: Host + '/member/sendMobileAuthCode',
        validMobileAuthCode: Host + '/member/validMobileAuthCode'
    },
    wechat: {
        toAuthorize: 'http://1s960h2139.51mypc.cn/wechatgateway/oauth2/authorizeuserinfo',
        toAuthCallback: Host + '/member/callback',
        toFake: Host + '/member/callback',
        putMember: Host + '/member'
    },
    visitor: {
        getVisitor: Host + '/visitor',
        postVisitor: Host + '/visitor',
        deleteVisitor: Host + '/visitor'
    }
}