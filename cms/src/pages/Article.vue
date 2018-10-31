<template>
    <div class="article">
        <!-- 按钮区 -->
        <div class="btns">
            <el-select style="width:120px" size="mini" v-model="params.categoryId" clearable placeholder="所有栏目">
                <el-option v-for="c in categories" :value="c.id" :label="c.name" :key="c.id"></el-option>
            </el-select>
            <el-input prefix-icon="el-icon-search" style="width:150px" size="mini" placeholder="请输入关键字" v-model="params.keywords" clearable>
            </el-input>
            <el-button size="mini" @click="toAddArticle">新增</el-button>
            <el-button size="mini" @click="batchDeleteArticle">批量删除</el-button>
        </div>
        <!-- 按钮区结束 -->
        <!-- {{params}} -->
        <!-- {{multipleSelection}} -->
        <!-- 表格区 -->
        <div class="article_tbl" v-loading='loading'>
            <el-table :data="articles" style="width: 100%" size="mini" :border="true" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="38">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="编号"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="文章标题"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="category.name"
                    label="所属栏目"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="publishtime"
                    label="发布时间">
                </el-table-column>
                <el-table-column
                    prop="readtimes"
                    label="阅读次数"
                    width="120">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope='{row}'>
                        <i class="fa fa-trash" @click='deleteArticle(row.id)'></i>
                        <i class="fa fa-pencil" @click='toUpdateArticle(row)'></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 表格区结束 -->
        <!-- 分页 -->
        <div class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="params.pageSize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!-- 分页结束 -->
        <!-- 模态框 -->
        <el-dialog fullscreen    :title="aDialog.title" :visible.sync="aDialog.visible">
            {{aDialog.form}}
            <el-form :model="aDialog.form" size='mini' label-position="left">
            <!-- {{aDialog.form}} -->
                <el-form-item label="资讯标题" label-width="6em">
                    <el-input v-model="aDialog.form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资讯栏目" label-width="6em">
                    <el-select v-model="aDialog.form.categoryId" placeholder="请选择">
                        <el-option :key='c.id' v-for='c in categories' :label="c.name" :value="c.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="列表样式" label-width="6em">
                    <ul class="list_style"> 
                        <li class="style_one" :class="{current:aDialog.form.liststyle=='style_one'}" @click="aDialog.form.liststyle='style_one'">
                            <img src="@/assets/style_one.jpg" alt="">
                        </li>
                        <li class="style_two" :class="{current:aDialog.form.liststyle=='style_two'}" @click="aDialog.form.liststyle='style_two'">
                            <img src="@/assets/style_two.jpg" alt="">
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="缩略图" label-width="6em">
                    <el-upload
                        action="http://120.79.191.20:8099/manager/file/upload"
                        :on-success="handleUploadSuccess"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="资讯正文" label-width="6em">
                    <el-input v-model="aDialog.form.content" type="textarea" :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size='mini' @click='closeADialog'>取 消</el-button>
                <el-button size='mini' type="primary" @click='saveOrUpdateArticle'>确 定</el-button>
            </div>
        </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>
    import axios from '@/http/axios';
    export default{
        data(){
            return{
                loading:false,
                articles:[],
                categories:[],
                multipleSelection:[],
                total:[],
                params:{
                    page:0,
                    pageSize:5,
                    // 可有可无，不要用null
                    // categoryId:undefined,
                    // keywords:undefined
                },
                aDialog:{
                    title:'',
                    visible:false,
                    form:{
                        liststyle:'style_one',
                        fileIds:[]
                    }
                }
            }
        },
        created(){
            this.findAllArticles();
            this.findAllCategories();
        },
        watch:{
            params:{
                handler:function(){
                    this.findAllArticles();
                },
                deep:true
            }
        },
        methods:{
            // 文件上传成功时的钩子,将拿到的图片idpush到filesId里
            handleUploadSuccess(response, file, fileList){
                this.aDialog.form.fileIds.push(response.data.id);
            },
            // 提交保存或修改信息
            saveOrUpdateArticle(){
                axios.post('/manager/article/saveOrUpdateArticle',this.aDialog.form)
                .then(()=>{
                    this.$notify.success({
                        title: '成功',
                        message: '提交成功！'
                    });
                    this.closeADialog();
                    this.findAllArticles();
                })
                .catch(()=>{
                    this.$notify.error({
                        title: '错误',
                        message: '提交失败！'
                    });
                })          
            },
            // 弹出新增文章模态框
            toAddArticle(){
                this.aDialog.title="发布资讯";
                this.aDialog.visible=true;
            },
            // 关闭模态框
            closeADialog(){
                this.aDialog.form={};
                this.aDialog.visible=false;
            },
            // 处理当前页的改变
            handleCurrentChange(page){
                // alert(page);
                this.params.page=page-1;
            },
            // 修改
            toUpdateArticle(row){
                // 删除category,添加categoryId
                let article=_.clone(row);
                article.categoryId=article.category.id;
                delete article.category;
                article.fileIds=article.articleFileVMs.map(item=>item.cmsFile.id);
                delete article.articleFileVMs;
                for(let key in article){
                    let val=article[key];
                    if(key){

                    }
                }
                this.aDialog.form=row;
                this.aDialog.visible=true;
                this.aDialog.title="修改资讯";
            },
            // 批量删除
            batchDeleteArticle(){
                let ids=this.multipleSelection.map((item)=>{
                    return item.id;
                });
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    axios.post('/manager/article/batchDeleteArticle',{ids})
                    .then(()=>{
                        this.$notify.success({
                            title: '成功',
                            message: '删除成功！'
                        });
                        this.findAllArticles();
                    })
                    .catch(()=>{
                        this.$notify.error({
                            title: '错误',
                            message: '删除失败！'
                        });
                    })
                })
            },
            // 通过id删除文章
            deleteArticle(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    axios.get('/manager/article/deleteArticleById?id='+id)
                    .then(()=>{
                        this.$notify.success({
                            title: '成功',
                            message: '删除成功！'
                        });
                        this.findAllArticles();
                    })
                    .catch(()=>{
                        this.$notify.error({
                            title: '错误',
                            message: '删除失败！'
                        });
                    })
                })
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            // 查询所有栏目信息
            findAllCategories(){
                axios.get('/manager/category/findAllCategory')
                // 获取到data，并重命名为result
                .then(({data:result})=>{
                    this.categories=result.data;
                    // console.log(result);
                })
                .catch(()=>{
                    this.$notify.error({
                        title: '错误',
                        message: '网络异常，加载失败！'
                    });
                })
            },
            // 查询所有文章
            findAllArticles(){
                this.loading=true;
                axios.get('/manager/article/findArticle',{
                    params:this.params
                })
                // 获取到data，并重命名为result
                .then(({data:result})=>{
                    this.total=result.data.total;
                    this.articles=result.data.list;
                })
                .catch(()=>{
                    this.$notify.error({
                        title: '错误',
                        message: '网络异常，加载失败！'
                    });
                })
                .finally(()=>{
                    this.loading=false;
                })
            }
        }
    }

</script>
<style>
    .btns{
        margin-bottom: .5em;
    }
    i.fa{
        margin: 0 .3em;
        cursor: pointer;
    } 
    i.fa.fa-trash{
        color: #F56C6C;
    }
    .page{
        float: right;
    }
    .list_style{

    }
    .list_style>li{
        width: 200px;
        height: 80px;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: .5em;
    }
    .list_style>li.current{
        border-color: #409eff;
    }
    .list_style>li img{
        width: 100%;
    }
    .list_style>li.style_one{
        float: left;
    }
    .list_style>li.style_two{
        margin-left: 220px;
    }
</style>