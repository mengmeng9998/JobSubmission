 <template>
	<div class="customer">
		顾客{{id}}
	</div>
</template>
<script>
	export default{
		watch:{
            '$route':function(to,from){
            	// console.log('to:',to);
            	this.id=this.$route.params.id;
            }
        }, 
		data(){
			return{
				id:0
			}
		},
		mounted(){
			console.log(this.$router);
			console.log(this.$route);
			this.id=this.$route.params;
			//$route代表当前路由，$router代表整个路由器实例
			// alert(JSON.stringify(this.$route.params.id));	
			// console.log(this.$route);
		}
	}
</script> 