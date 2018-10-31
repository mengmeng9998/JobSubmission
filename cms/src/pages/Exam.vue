<template>
	<div class="exam">
		<ul class="exam_nav">
			<li>
				<router-link to='/exam/create'>创建考试</router-link>
			</li>
			<li>
				<router-link to='/exam/place'>考场设定</router-link>
			</li>
			<li>
				<router-link to='/exam'>成绩录入</router-link>
			</li>
			<li>
				<router-link to='/exam'>成绩统计</router-link>
			</li>
		</ul>

		<div class="exam_content">
            <router-view></router-view>
		</div>
	</div>
</template>
<style>
	.exam_nav{
		border-bottom: 1px solid #ededed;
		height: 2em;
	}
	.exam_nav::after{
		content: '';
		display: block;
		clear: both;
	}
	.exam_nav>li{
		float: left;
		line-height: 2em;
		border-right: 1px solid #ededed;
		width: 120px;
		text-align: center;
	}
</style>