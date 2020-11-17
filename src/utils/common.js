//时间戳转换为日期时间
export function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

// 注:时间戳转时间（ios手机NaN）
// function getTime(nS) {
//     var date=new Date(parseInt(nS)* 1000);
//     var year=date.getFullYear();
//     var mon = date.getMonth()+1;
//     var day = date.getDate();
//     var hours = date.getHours();
//     var minu = date.getMinutes();
//     var sec = date.getSeconds();
//     return year+'/'+mon+'/'+day+' '+hours+':'+minu+':'+sec;
// }