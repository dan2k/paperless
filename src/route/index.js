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
		const user_type=Number(store.userData.user_type);
		let cdg=['/cdg','/svpc','/sv'];
		let moi=['/dcs','/pcs','/rcs','/cos'];
		// console.log(to.path)
		if(user_type==1 && cdg.includes(to.path)){
			next('/')
		}
		if(user_type==2 && moi.includes(to.path)){
			next('/')
		}

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
		path:"/pcs",
		name:'pcs',
		component: () => import("../views/pcs.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/rcs",
		name:'rcs',
		component: () => import("../views/rcs.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/ccs",
		name:'ccs',
		component: () => import("../views/ccs.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/cdg",
		name:'cdg',
		component: () => import("../views/cdg.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/sv/:jobid",
		name:'sv',
		component: () => import("../views/sv_detail.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/svpc/:jobid",
		name:'svpc',
		component: () => import("../views/sv_detailPC.vue"),
		beforeEnter: beforeEnter,
	},
	
	{
		path:"/ddopa",
		name:'ddopa',
		component: () => import("../views/ddopa.vue"),
		beforeEnter: beforeEnter,
	},
	{
		path:"/pdf/:jobid",
		name:'pdf',
		component: () => import("../views/pdf.vue"),
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