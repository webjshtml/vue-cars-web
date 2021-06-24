import router from "./index";
import store from "../store";

// 守卫路由，进入路由之前
router.beforeEach((to, form, next) => {
    
    if(to.meta && to.meta.title) {
        const routerName = to.meta.title;
        document.title = routerName;
        store.commit("app/SET_ROUTER_NAME", routerName);
    }
    
    next();
})