import Cookie from "cookie_js"

export function getToken() {
    return Cookie.get('admin_token');
}

export function setToken(value) {
    Cookie.set('admin_token', value)
}

export function removeToken() {
    setToken('')
}


export function getUsername() {
    return Cookie.get('user_name');
}

export function setUsername(value) {
    Cookie.set('user_name', value)
}

export function removeUsername() {
    setUsername('')
}

/*html5本地存储 */
// 取本地值，本地没值取默认值(临时)
// isCollpase: JSON.parse(sessionStorage.getItem('isCollpase')) || false,
//取本地值，本地没值取默认值(长期)
// isCollpase: JSON.parse(localStorage.getItem('isCollpase')) || false,

// html5本地存储(临时存储，关闭浏览器就清除)
// sessionStorage.setItem('isCollpase', JSON.stringify(state.isCollpase))
//html5本地存储(长期存储，关闭浏览器不会清除)
// localStorage.setItem('isCollpase', JSON.stringify(state.isCollpase))
