import { useAuthStore } from "@/store"
import {
	createRouter,
	createWebHistory,
} from "vue-router";
import { close, start } from '@/helpers/nprogress'
async function beforeEnter(to, from, next) {
    const store=useAuthStore()
	if(from.path !='/login'){
		await store.checkLogin()
	}
	if (store.isLogin) {
		next();
		return;
	}
	store.$reset()
	next("/login");
}
const routes = [
	{
		path: "/:pathMatch(.*)*",
		name: "PageNotFound",
		component: () => import("../views/error.vue"),
	},
	{
		path: "/",
		name: "home",
		component: () => import("../views/home.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/dcs",
		name:'dcs',
		component: () => import("../views/dcs.vue"),
		beforeEnter: beforeEnter,
	},
    {
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
		// beforeEnter: beforeEnter,
	},
	
]
const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_PRIVATE_BASE_URL),
	routes,
});
router.beforeEach((pre, next) => {
	start()
})
router.afterEach(() => {
	close()
})
export default router;