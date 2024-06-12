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
		let cdg=['cdg','svpc','sv'];
		let moi=['dcs','pcs','rcs','cos'];
		// console.log(to.path)
		// console.log(to.path?.split('/')[1])
		if((user_type==1 && cdg.includes(to.path?.split('/')[1])) || (user_type==2 && moi.includes(to.path?.split('/')[1]))){
			// console.log('yes')
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
		path: "/qrcode/:jobid",
		name: "qrcode",
		component: () => import("../views/qrcode.vue"),
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
		path:"/svpc-dev/:jobid",
		name:'svpc-dev',
		component: () => import("../views/sv_detailPC-dev.vue"),
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
	{
		path: "/report",
		name: "report",
		component: () => import("../views/report/index.vue"),
		beforeEnter: beforeEnter,
		children:[
			{
				path: 'main',
				name:'report-main',
				component: ()=>import("@/views/report/main.vue"),
				beforeEnter: beforeEnter,
			},
		],
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