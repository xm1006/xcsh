const $ = new Env("享时代");
const CryptoJS = require("crypto-js");
const key = CryptoJS.enc.Utf8.parse("bbbbb112"); // 16位密钥
const iv = CryptoJS.enc.Utf8.parse("wabjd9XB"); // 16位向量

let envSplitor = ['\n']
let httpResult, httpReq, httpResp

let userCookie = ($.isNode() ? process.env.xcsh : $.getdata('xcsh')) || '';

let userList = []
let userIdx = 0
let userCount = 0
/////
function encrypt(message, key, iv) {
  const encrypted = CryptoJS.DES.encrypt(message, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString().replace(/\+/g, "-_-");
}
function decrypt(ciphertext, key, iv) {
  const replacedCiphertext = ciphertext.replace(/-_-/g, "+");
  const decrypted = CryptoJS.DES.decrypt(replacedCiphertext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/////
class UserInfo {
    constructor(str) {        
        this.index = ++userIdx
        this.num = this.index
        this.valid = false
        this.withdrawFailCount = 0

        try {
            this.param = str
            this.ckValid = true            
        } catch (e) {
            this.ckValid = false
            console.log(`账号[${this.index}]无效，请检查格式`)
        }
    }


async Login() {
let msg ='uBgRzonkzn-_-G5wl/QAjOVwQ6voAZ8d0kl1g7DQ4WVF0y4zDMf4f60ZqS1/lH1qUTMo6-_-sAMXoH3OCQTmK2CEdnwtDeG/ckUGhWd9LTCYBysMvj6vdyIHfXZH9WopbZAg/BKV8bZi4EYN1nKeeLZCrfynbslEW6/6IYQSeh5Fa-_-3kXXN180eHUIB-_-lxImRXOayoLKenWwDoaufF3SnI3uyhUteO/2tzTJAoOK0MoWRSEzpgdbtGceAhFlc7dhOfAEJI7OWw08E/ljWCFexHryM7k3cBHhkyhLPgCVtF0c3bwmcl-_-Eifvec9NSmX0NwMYBK2LpmGpK0Gxd4EsnhXZk4khttGIi9Q30U2sIu7/MuW8='
console.log(decrypt(msg,key,iv))
    var phone = this.param.split("&")[0]
    var password = this.param.split("&")[1]
    let CkUrl = {
        url: 'https://m.xiaicn.com/cas/login?_random=' + Date.now(), //13位时间戳
    }
    await http(`get`, CkUrl)
    if (!Result) return await this.Login()
    var NiuToken = Result.headers['set-cookie'][0].split(';')[0]
    //console.log(result)
    var csrf_token = cheerio.load(result)('input[name=_csrf_token]').val()
    let DlUrl = {
        url: 'https://m.xiaicn.com/cas/login?_random=' + new Date().getTime().toString().substr(0, 13), //13位时间戳
        headers: {
            'Host': 'm.xiaicn.com',
            'Connection': 'keep-alive',
            'Content-Length': '185',
            'Accept': 'application/json, image/webp',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://m.xiaicn.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://m.xiaicn.com/cas/login',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': NiuToken
        },
        Body: '_csrf_token=' + csrf_token + '&_target_path=&_username=15219578803&_password=a123456',
    }
    await task(`post`, DlUrl.url, DlUrl.headers, DlUrl.Body)
    if (!Result) return await this.Login()
    var cookie = NiuToken + '; ' + Result.headers['set-cookie'][0].split(';')[0]
    if (JSON.parse(Result.body).code == 0) {
        console.log(`${this.num}Login>>${result.msg}`)
        let md = await this.cookie(cookie)
        await this.fenhong(md.split('&')[0] , md.split('&')[1])
        await this.Look( md.split('&')[1] )
    } else {
        console.log(`${this.num}Login>>${result.msg}`)
    }
}

async cookie(cookie) {
    let headers = {
        "Host": "m.xiaicn.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "X-Requested-With": "com.xiaicn.app",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": "https://m.xiaicn.com/cas/login",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": cookie
    }
    await task(`get`, 'https://m.xiaicn.com/user/home', headers)
    if (!Result) return await this.Login()
    let uid = Result.headers['set-cookie'][0].split(';')[0].split('=')[1]
    if (random(0, 1)) {
        return uid + "&" + "popUid=" + uid + '; ' + cookie
    } else {
        return uid + "&" + cookie + '; ' + "popUid=" + uid
    }
}


async fenhong(uid , ck) {
    var headers = {
        "Host": "m.xiaicn.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "X-Requested-With": "com.xiaicn.app",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": "https://m.xiaicn.com/user/home",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": ck
    }
    // 
    await task(`get`, "https://m.xiaicn.com/user/daily_dividend?_nav=0lkd55uo", headers)
    /**/
    var add = "_empty_post=" + Date.now()
    await task(`post`,  "https://m.xiaicn.com/user/daily_dividend/award?_random=" + Date.now(), headers, add)
    if (result.code == 0) {
        console.log(`${this.num}领取分红成功`)
    } else {
       console.log(`${this.num}领取失败${result.msg}`)
    }
await task(`get`, "https://m.xiaicn.com/user/active/period_task", headers)
if (result.split("每日签到")[2].split('="')[1].split('"')[0] == "rate color-blue") {
    console.log(`${this.num}今日已签到`)
} else {
try{
    await task(`get` , `https://m.xiaicn.com/user/active/daily_sign` , headers )
    var csrftoken = result.split("csrfToken")[1].split('"')[1]
    let resid = sjzm(32)

    let yzl = "https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/"
    let yyy = {
        "Host": "api-access.pangolin-sdk-toutiao.com",
        "user-agent": "okhttp/3.9.1",
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": "7062",
        "Connection": "Keep-Alive"
    }
    let yss = defaultBody(uid, resid, "daily_sign")
    var res = await task(`post`, yzl, yyy, yss)

    let tjson = "requestId=" + resid + "&csrfToken=" + csrftoken
    await task(`post`, 'https://m.xiaicn.com/user/active/daily_sign/sign?_random=' + Date.now(), headers , tjson )
    if (result.code == 0) {
        let money = `${result.data.grantMoney}`/10000
        console.log(`${this.num}签到${money}元`)
    } else {
       console.log(`${this.num}签到${result.msg}`)
    }
    }catch(e){ }
    let ab = 'https://m.xiaicn.com/user/active/period_task/reward?_random=' + Date.now()

    let tjsoon = "taskId=152&isCurrent=1"
    await task(`post`, ab, headers, tjsoon)
    if (result.code == 0) {
        let moneyy = `${result.data.rewardMoney}`/10000
        console.log(`${this.num}签到${moneyy}元`)
    } else {
        console.log(`${this.num}签到${result.msg}`)
    }
    if(new Date().getDate()>=26){
        let tjsoonn="taskId=133&isCurrent=1"      
        await task(`post`, "https://m.xiaicn.com/user/active/period_task/reward?_random="+sjc, headers, tjsoonn)
        if(result.code==0){             
        let moneyy=`${result.data.rewardMoney}`/10000
        console.log(`${this.num} 本月签到26天 ${moneyy} 元`)   
        }else{
        console.log(`${this.num} 本月签到26天 ${result.msg} `)}
        }
}    
}

async Look(ck) {
    let lists = ['kwai_video', 'pangle_video']
    let names = ['快手视频', '抖音视频']
    for (let ir = 0; ir < 2; ir++) {
        var rrr = lists[ir]
        var name = names[ir]
        for (let ii = 0; ii < 30; ii++) {
            try {
                var sjc1 = new Date().getTime().toString().substr(0, 13)
                var sjc2 = new Date().getTime().toString().substr(0, 10)
                let ur = 'https://m.xiaicn.com/' + rrr + '/launch?_random=' + sjc1 + '&type=slide'
                var headers = {
                    "Host": "m.xiaicn.com",
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "X-Requested-With": "com.xiaicn.app",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "https://m.xiaicn.com/user/home",
                    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Cookie": ck
                }
                await task(`get`, ur, headers)

                
                if (result.code == 0) {               
                    var sb = sjzm(15)
                    var csrfToken = result.data.extArgs.csrfToken
                    let ur2 = 'https://m.xiaicn.com/' + rrr + '/award/prepare?_t=' + Date.now()
                    var headers2 = {
                        "User-Agent": "Mozilla/5.0 (compatible; HuoNiuHttp/1.0) Android",
                        "Cookie": ck,
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Content-Length": "216",
                        "Host": "m.xiaicn.com",
                        "Connection": "Keep-Alive"
                    }
                    var sign = SHA1Encrypt(csrfToken + '#' + sb + '#' + sjc2)
                    let result2 = "csrfToken=" + csrfToken + "&deviceId=" + sb + "&timestamp=" + sjc2 + "&sign=" + sign
                    var res = await task(`post`, ur2, headers2, result2)
                    if (result.data.enable == true) {
                        var csrfToken2 = result.data.csrfToken
                        ///////
                        let ur3 = 'https://m.xiaicn.com/' + rrr + '/award/grant?_t=' + sjc2
                        var sign2 = SHA1Encrypt(csrfToken2 + '#' + sb + '#' + sjc2)
                        let result3 = "csrfToken=" + csrfToken2 + "&deviceId=" + sb + "&timestamp=" + sjc2 + "&sign=" + sign2
                        await task(`post`, ur3, headers2, result3)                        
                        console.log(`\n${this.num}${name}${result.data.awardMoney}元\n`)
                        //////
                    } else {
                        if (result.data.reason == "CSRF令牌失效") {
                            console.log(`\n${this.num}${name}${result.data.reason}\n`)
                        } else {
                            console.log(`\n${this.num}${name}${result.data.reason}\n`)
                            break
                        }
                    }
                    //////////
                } else {
                    console.log(result)
                    break
                }
                await $.wait(8000)
            } catch (y) {}
        }
    }
}
   
async list(){

  var sjc = new Date().getTime().toString().substr(0, 13)
        let uid=this.param.split("&")[0]
        let ck=this.param.split("&")[1]       
        var num=this.num
        
        
        /**/    
        
        /**/            
        let uu="https://m.xiaicn.com/user/daily_dividend/award?_random="+sjc        
        let headersss={"Host": "m.xiaicn.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "X-Requested-With": "com.xiaicn.app",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": "https://m.xiaicn.com/user/home",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": ck}
       // 
       await task(`get`, `string`, "https://m.xiaicn.com/user/daily_dividend?_nav=0lkd55uo", headersss)
       /**/      
       var add="_empty_post="+sjc
        await task(`post`, `json`, uu, headersss, add)
        if(DATA.code==0){
        console.log(`${num} 领取分红成功`)
        }else{
        console.log(`${num} 领取失败 ${DATA.msg}`)
        }
        
 await this.签到()
}    
  //
async 签到() { 
        try {
        var abc=['Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3263 MMWEBSDK/20220204 Mobile Safari/537.36 MMWEBID/3228 MicroMessenger/8.0.20.2100(0x28001437) Process/toolsmp WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',   
'Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151'
]
var ua=abc[RT(0,1)]
        var sjc = new Date().getTime().toString().substr(0, 13)
        let uid=this.param.split("&")[0]
        let ck=this.param.split("&")[1]
        
        var num=this.num
        /**/    
                                       
        
        let uu="https://m.xiaicn.com/user/active/period_task?type=daily"        
        let headersss={"Host": "m.xiaicn.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "X-Requested-With": "com.xiaicn.app",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": "https://m.xiaicn.com/user/home",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": ck}
       // console.log(headersss)
        await task(`get`, `string`, uu, headersss)
       
        // console.log(sgtext)    
        if(DATA.body.split("每日签到")[2].split('="')[1].split('"')[0]=="rate color-blue"){
        console.log(`${num} 今日已签到`)
        }else{
        for(let a=0;a<2;a++){
        try{
        let uaa="https://m.xiaicn.com/user/active/daily_sign"
        await task(`get`, `string`, uaa, headersss)
        let sgtext=DATA.body
        let sn_tk=sgtext.split("csrfToken")[1].split('"')[1]
        let aa="https://m.xiaicn.com/user/active/daily_sign/sign?_random="+sjc
        let resid=sjzm(32)
        
        let yzl="https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/"
        let headers={"Host":"api-access.pangolin-sdk-toutiao.com","user-agent":"okhttp/3.9.1","Content-Type":"application/json; charset=utf-8","Content-Length":"7062","Connection":"Keep-Alive"}
        let data=defaultBody(uid,resid,"daily_sign")
        var res=await task(`post`, `json`, yzl, headers, data )
        
        let tjson="requestId="+resid+"&csrfToken="+sn_tk 
        await task(`post`, `json`, aa, headersss, tjson)
        }catch(ee){}
        try{
        if(DATA.code==0){             
        let money=`${DATA.data.grantMoney}`/10000
        console.log(`${num} 签到 ${money} 元`)
        }else{
        console.log(`${num} 签到 ${DATA.msg} `)}
        let ab='https://m.xiaicn.com/user/active/period_task/reward?_random='+sjc
        
        let tjsoon="taskId=152&isCurrent=1"      
        await task(`post`, `json`, ab, headersss, tjsoon)
        if(DATA.code==0){             
        let moneyy=`${DATA.data.rewardMoney}`/10000
        console.log(`${num} 签到 ${moneyy} 元`)
        break     
                }else{
        console.log(`${num} 签到 ${DATA.msg} `)}
                            
        }catch(all){ console.log(all)}}              
        }
        await $.wait(RT(500, 2000))
        if(new Date().getDate()>=26){
        let tjsoonn="taskId=133&isCurrent=1"      
        await task(`post`, `json`, "https://m.xiaicn.com/user/active/period_task/reward?_random="+sjc, headersss, tjsoonn)
        if(DATA.code==0){             
        let moneyy=`${DATA.data.rewardMoney}`/10000
        console.log(`${num} 本月签到26天 ${moneyy} 元`)   
        }else{
        console.log(`${num} 本月签到26天 ${DATA.msg} `)}
        }
        
        let uus="https://m.xiaicn.com/user/active/period_task?type=daily"        
       
       // console.log(headersss)
        await task(`get`, `string`, uus, headersss)
        // console.log(sgtext)    
        if(DATA.body.split("看10次广告视频")[3].split('="')[1].split('"')[0]=="rate color-blue"){
        console.log(`${num} 今日视频任务已完成`)
        }else{           
        var object=[]
        for(let i=0;i<25;i++){
        await $.wait(RT(500, 2000))
        if(object.length==13){
        break
        }
        let yzl="https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/"
        let headers={"Host":"api-access.pangolin-sdk-toutiao.com","user-agent":"okhttp/3.9.1","Content-Type":"application/json; charset=utf-8","Content-Length":"7062","Connection":"Keep-Alive"}
        let data=defaultBody(uid,sjzm(32),"period_task")
        var res=await task(`post`, `json`, yzl, headers, data )
       // console.log(DATA)
        //console.log(`第${i}次运行`)
        if(DATA.cypher==3){
        object.push(1)
        console.log(`${num} 第${object.length}次验证通过`)        
        }else{
        console.log('验证失败')}               
        let DD = RT(5000, 10000)
        await $.wait(DD)
        }       
        
        }
        await $.wait(2000)
        for(let a=0;a<1;a++){
        try{           
        //////////     领取看10次视频广告奖励
        let abb='https://m.xiaicn.com/user/active/period_task/reward?_random='+new Date().getTime().toString().substr(0, 13)
    
        let tjsooon="taskId=178&isCurrent=1"      
        await task(`post`, `json`, abb, headersss, tjsooon) 
             
      //  console.log(DATA)
        if(DATA.code==0){
        let moneyy=`${DATA.data.rewardMoney}`/10000
        console.log(`${num} 看视频广告 ${moneyy} 元`)
        break
        }else{
        console.log(`${num} 看视频广告 ${DATA.msg} `)}        
        }catch(all){ console.log(all)}  await $.wait(500)}

        //视频赚
       let lists=['kwai_video','pangle_video']
       let names=['快手视频','抖音视频']
       try{
       for(let ir=0;ir<2;ir++){
       var rrr=lists[ir]
       var name=names[ir]
       //    循环
        for(let ii=0;ii<30;ii++){
        try{
        var sjc1 = new Date().getTime().toString().substr(0, 13)
        var sjc2 = new Date().getTime().toString().substr(0, 10)
        let ur='https://m.xiaicn.com/'+rrr+'/launch?_random='+sjc1+'&type=slide'
        let hhh={"Host": "m.xiaicn.com",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 3 Build/SP1A.210812.016.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36 HuoNiuFusion/1.22.0_222151",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "X-Requested-With": "com.xiaicn.app",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        "Referer": "https://m.xiaicn.com/user/home",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": ck}
        await task(`get`, `json`, ur, hhh)      
        if(DATA.code==0){
        var sb=sjzm(15)
        var csrfToken=DATA.data.extArgs.csrfToken
        let ur2='https://m.xiaicn.com/'+rrr+'/award/prepare?_t='+sjc
        var headers2={"User-Agent": "Mozilla/5.0 (compatible; HuoNiuHttp/1.0) Android",
        "Cookie": ck,"Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": "216","Host": "m.xiaicn.com","Connection": "Keep-Alive"}
        var sign=SHA1Encrypt(csrfToken+'#'+sb+'#'+sjc2)
        let data2="csrfToken="+csrfToken+"&deviceId="+sb+"&timestamp="+sjc2+"&sign="+sign
        var res=await task(`post`, `json`, ur2, headers2, data2)
        if(DATA.data.enable==true){
        var csrfToken2=DATA.data.csrfToken
        ///////
        let ur3='https://m.xiaicn.com/'+rrr+'/award/grant?_t='+sjc2
        var sign2=SHA1Encrypt(csrfToken2+'#'+sb+'#'+sjc2)
        let data3="csrfToken="+csrfToken2+"&deviceId="+sb+"&timestamp="+sjc2+"&sign="+sign2
        var res=await task(`post`, `json`, ur3, headers2, data3)   
        console.log(`\n${num} ${name} ${DATA.data.awardMoney} 元\n`)
        //////
        }else{
        if(DATA.data.reason=="CSRF令牌失效"){
        console.log(`\n${num} ${name} ${DATA.data.reason}\n`)
        }else{
        console.log(`\n${num} ${name} ${DATA.data.reason}\n`)
        break} }
        //////////
        }else{
        console.log(DATA)
        break}        
        await $.wait(8000)        
         }catch(y){}
        }

        /////////    循环结束
        }
        }catch(error){
        console.log(error)
        }
        
        
        
        } catch(e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }


    
    }
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite()
    } else {
        if (!(await checkEnv())) return;
        let taskall = []
        let validList = userList.filter(x => x.ckValid)

        if (validList.length > 0) {
            taskall = []          
           for (let user of validList) {
            taskall.push(user.Login())
            
            
            }
            await Promise.all(taskall)
        }

    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())


async function GetRewrite() {
    if ($request.url.indexOf(`cloudData/ver?`) > -1) {
        if (!$request.headers) return;
        let url = $request.url
        let temp1 = url.split('?');
        let pram = temp1[1];
        let ck = `${pram}`
        console.log(ck)
        if (userCookie) {
            if (userCookie.indexOf(ck) == -1) {
                userCookie = userCookie + '@' + ck
                $.setdata(userCookie, 'xyxcookie');
                ckList = userCookie.split('@')
                $.msg(`获取第${ckList.length}个ck成功: ${ck}`)
            }
        } else {
            $.setdata(ck, 'xyxcookie');
            $.msg(`获取成功: ${ck}`)
        }
    }
}

async function checkEnv() {
    if (userCookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let userCookies of userCookie.split(splitor)) {
            if (userCookies) userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
        console.log('未找到CK')
        return;
    }
    console.log(`共找到${userCount}个账号`)
    return true
}

/*
function task(method, mode, taskurl, taskheader, taskbody) {
    return new Promise(async resolve => {
        let url = {
            url: taskurl,
            headers: taskheader,
            body: taskbody,
            //timeout: 5000,
        }
        $[method](url, (err, resp, data) => {  
     //   console.log(url)      
                try {                  
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                    } else {
                        if (data) {
                                               
                            if (data.indexOf(`<body>`) >= 0) {
                                DATA = data
                            } else {
                            if(mode=='string'){
                            DATA = resp
                            }else{
                            DATA=JSON.parse(data)
                            }
                            }
                        } else {
                            console.log(`请求失败︕`)
                        }
                    }
                } catch (e) {
                    $.logErr(e, data)
                } finally {
                    resolve();
                }
            },
        )
    })
}*/
function task(method, taskurl, taskheader, taskbody) {
    return new Promise(async resolve => {
        let url = {
            url: taskurl,
            headers: taskheader,
            body: taskbody,
        }
        $[method](url, (err, resp, data) => {
            try {
                Result = resp;
                result = data;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if (resp.body) {
                        if (typeof resp.body == "object") {
                            result = resp.body;
                        } else {
                            try {
                                result = JSON.parse(resp.body);
                            } catch (e) {
                                result = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        }, )
    })
}

async function http(method,url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                result = req;
                Result = resp;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if(resp.body) {
                        if(typeof resp.body == "object") {
                            result = resp.body;
                        } else {
                            try {
                                result = JSON.parse(resp.body);
                            } catch (e) {
                                result = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}





function sjstr(){
let date = new Date()
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        var str="[" + h + ":" + minute + ":" + second + "]"
        return str
    }
function debugLog(...args) {
    if (debug) {
        console.log(...args);
    } 
}
function random(X, Y) {
    do rt = Math.round(Math.random() * Y);
    while (rt < X)
    return rt;
}
function md5(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }

function SHA1Encrypt(msg){function add(x,y){return((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000);}function SHA1hex(num){var sHEXChars="0123456789abcdef";var str="";for(var j=7;j>=0;j--)str+=sHEXChars.charAt((num>>(j*4))&0x0F);return str;}function AlignSHA1(sIn){var nblk=((sIn.length+8)>>6)+1,blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(i=0;i<sIn.length;i++)blks[i>>2]|=sIn.charCodeAt(i)<<(24-(i&3)*8);blks[i>>2]|=0x80<<(24-(i&3)*8);blks[nblk*16-1]=sIn.length*8;return blks;}function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function ft(t,b,c,d){if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}function kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}var x=AlignSHA1(msg);var w=new Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);t=add(add(rol(a,5),ft(j,b,c,d)),add(add(e,w[j]),kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}a=add(a,olda);b=add(b,oldb);c=add(c,oldc);d=add(d,oldd);e=add(e,olde);}SHA1Value=SHA1hex(a)+SHA1hex(b)+SHA1hex(c)+SHA1hex(d)+SHA1hex(e);return SHA1Value;}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `${this.name}, 开始!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        send(m, t, e = (() => {})) {
            if(m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if(m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if(t.body && t.headers) {
                if(!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if(this.isSurge() || this.isLoon()) {
                if(this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1});
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if(m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                        hints: !1
                    })),
                $task.fetch(t).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}, 结束! ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
