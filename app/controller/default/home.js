// 前台的接口写在default里面

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "result";
  }
  async getArticleList(){
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'article.view_count as view_count,'+
              'article.createTime as createTime,'+
              'blog_type.typeName as typeName '+
              'FROM article LEFT JOIN blog_type ON article.type_id = blog_type.id'
      const result = await this.app.mysql.query(sql)
      this.ctx.body={data:result}
    }
    
  async getArticleById(){
    let id = this.ctx.params.id
    let sql ='SELECT article.id as id,'+
             'article.title as title,'+
             'article.introduce as introduce,'+
             'article.article_content as article_content,'+
             'article.view_count as view_count,'+
             'article.createTime as createTime,'+
             'blog_type.typeName as typeName, '+
             'blog_type.id as typeId '+
             'FROM article LEFT JOIN blog_type ON article.type_id = blog_type.id '+
             'WHERE article.id ='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

  // 得到文章类别名称
  async getTypeInfo(){
    const result = await this.app.mysql.select('blog_type')
    this.ctx.body = {data:result}
  }

}

module.exports = HomeController;
