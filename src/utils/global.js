import {
    MessageBox
} from 'element-ui';


/*自定义全局方法，原型*/
export default {
    install(Vue, options) {
        Vue.prototype.confirm = (params) => {
            MessageBox.confirm(params.content, params.tip || "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: params.type || "warning",
                center: true
            })
                .then(() => {
                    //确定
                    params.fn && params.fn(params.id)
                })
                .catch(() => {
                    //取消
                    params.catchFn && params.catchFn(params.id)
                });
        }
    }
}

/*自定义全局方法，vue3.0*/
// export function global() {
//     const confirm = (params) => {
//         console.log(params)
//         MessageBox.confirm(params.content, params.tip || "提示", {
//                 confirmButtonText: "确定",
//                 cancelButtonText: "取消",
//                 type: params.type || "warning",
//                 center: true
//             })
//             .then(() => {
//                 params.fn && params.fn(params.id)
//             })
//             .catch(() => {});
//     }
//     return (confirm)
// }