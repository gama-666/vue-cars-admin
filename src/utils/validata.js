/*
过滤特殊字符 
*/
export function stripscript(str) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/*
验证邮箱
*/
export function validataEmail(value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(value) ? true : false;
}
/*
密码校验
*/
export function validataPassword(value) {
    let reg = /^(?!bai[0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return !reg.test(value) ? true : false;
}
/*
验证码校验
*/
export function validataCode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false;
}

//校验必须为数据
export function validateNumber (rule, value, callback) {
    const regNumber = /^[0-9]*$/;
    if (!value) {
      callback(new Error("请输入可停放车辆"))
    } else if (!regNumber.test(value)) {
      callback(new Error("请输入数字!"))
    } else {
      callback()
    }
}

  