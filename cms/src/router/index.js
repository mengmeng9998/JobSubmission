import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Category from '@/pages/Category'
import Article from '@/pages/Article'
import User from '@/pages/User'
import Exam from '@/pages/Exam'
import ExamCreate from '@/pages/exam/ExamCreate'
import ExamPlace from '@/pages/exam/ExamPlace'
import Customer from '@/pages/Customer'

Vue.use(Router)

export default new Router({
  	routes: [
  		{
	      	path: '/customer/:id',
	      	component: Customer
    	},{
	      	path: '/',
	      	component: Hello
	      	// redirect:'/user'
	      	// redirect:{name:'User'}
    	},{
	      	path: '/category',
	      	component: Category
    	},{
	      	path: '/article',
	      	component: Article
    	},{
	      	path: '/user',
	      	name:'User',
	      	component: User
    	},{
	      	path: '/exam',
	      	component: Exam,
	      	children:[{
	      		// 路由 /exam/create
	      		path: 'create',
	      		component: ExamCreate,
	      	},{
	      		path: 'place',
	      		component: ExamPlace,
	      	}]
    	},
  	]
})
