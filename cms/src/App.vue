<template>
	<div class="app">
		<div class="header">
			<div class="title">作业提交管理系统</div>
		</div>
		<div class="content">
			<div class="left_nav">
				<el-menu router default-active="/" background-color="#5B6B7A" text-color="#fff" 	active-text-color="#ffd04b">
					<el-menu-item index="/">
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
				  	</el-menu-item>
					<el-menu-item index="/User">
							<i class="el-icon-location"></i>
					  		<span slot="title">学生信息</span>
				  	</el-menu-item>
				  	<el-menu-item index="/category">
						<i class="el-icon-document"></i>
						<span slot="title">作业管理</span>
				  	</el-menu-item>
				  	<el-menu-item index="4" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">教师管理</span>
				  	</el-menu-item>
				  	<el-menu-item index="/article">
						<i class="el-icon-setting"></i>
						<span slot="title">公告信息</span>
				  	</el-menu-item>
				  	<!-- <el-submenu index="/article">
						<template slot="title">
							<i class="el-icon-setting"></i>
					  		<span>公告信息管理</span>
						</template>
					  	<el-menu-item index="1-4-1">
							<i class="fa fa-laptop"></i>
					  		<span>公告信息录入</span>
					  	</el-menu-item>
					  	<el-menu-item index="1-4-29">
					  		<i class="fa fa-eye"></i>
					  		<span>公告信息浏览</span>	
					  	</el-menu-item>
				  	</el-submenu> -->
				</el-menu>
			</div>
			<div class="right_content">
				<div class="wrapper">
					<router-view></router-view>
				</div>
			</div>
		</div>   
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style>
	i.fa{
		margin: 0 .5em;
	}
	html{
		font:normal normal 12px '宋体','Microsoft YaHei';
		color: #666;
	}
	body,ul,ol,dl,p,h1,h2,h3{
		margin: 0;
		padding: 0;
	}
	ul,ol{
		list-style: none;
	}
	a{
		color: #666;
		text-decoration: none;
	}
	div{
		box-sizing: border-box;
	}
	.header{ 
		position: absolute;
		width: 100%;
		height: 70px;
		top: 0;
		background-color: #47475c;
		padding: 0 2em;
	}
	.header .title{
		color: #fff;
		line-height: 70px;
		font-size: 24px; 
		font-weight: bold;
	}
	.content{
		position: absolute;
		width: 100%;
		top: 70px;
		bottom: 0;
	}
	 .content>.left_nav{
		width: 203px;
		height: 100%;
		float: left;
		background-color: #5B6B7A;
	}
	.content>.right_content{
		box-sizing: border-box;
		margin-left: 203px;
		height: 100%;
		background-color: #f0f0f0;
		padding: 1em;
	}
	.wrapper{
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: white;
		padding: .5em;
		overflow-y: auto;
	}
</style>