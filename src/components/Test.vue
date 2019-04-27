<!--头部（Header.vue）-->
<template>
  <div >
    <header id="header" class="header">
      <div class="w1200">
        <ul class="header-list">
          <li><a href="#" @click="change">跑马灯</a></li>
          <li><a href="#">评论区</a></li>
          <li><a href="#">更多</a></li>
          <li><a href="#">实例</a></li>
          <li><a  href="#">
            <el-dropdown>
              <span class="el-dropdown-link"><span>下拉菜<i class="el-icon-arrow-down el-icon--right"></i></span></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >蚵仔</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown></a>
          </li>
        </ul>
      </div>
    </header>
    <div style="color: gold;width: 500px;height: 300px;background-color: slategray;float: left">
    <div >
      <br/>
     <p align="center">{{text}}</p>
    </div>
  </div>
    <div style="color: slategray;width: 500px;height: 300px;float: left;background-color: antiquewhite;">
      <div >
        <br/>
        <p align="center">评论区</p>
        <p ><el-input v-model="things" style="width: 400px"></el-input><el-button @click="add" style="width: 100px">发表</el-button></p>
        <p align="center" v-for="item in thingList" v-bind:key="item.id"><i >{{item.name}}: {{item.value}}</i></p>
      </div>
    </div>
    <div style="color: brown;width: 500px;height: 300px;float: left;background-color: cadetblue;">
      <div >
        <br/>
        <p align="center">{{text}}</p>
      </div>
    </div>
    <div style="color: brown;width: 500px;height: 300px;float: left;background-color: cadetblue;">
      <div >
        <br/>
        <!--<div v-for="item in date" >-->
          <!--<p>{{item.ti}}</p>-->
          <!--<br/>-->
          <!--<el-radio v-model="item.answer" label="A"></el-radio>-->
          <!--<el-radio v-model="item.answer" label="B"></el-radio>-->
          <!--<el-radio v-model="item.answer" label="C"></el-radio>-->
          <!--<el-radio v-model="item.answer" label="D"></el-radio>-->
        <!--</div>-->
        <img
          style="width: 100px; height: 100px"
          src='/api/downloadPic?id=34'>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  mounted () {

  },
  created () {

  },
  data () {
    return {
      text: '当地群众自发走上街头，手持菊花，等候救火英烈归来。',
      num: '',
      flag: false,
      things: '',
      user: '薛庭政',
      thingList: [
        {
          id: 0,
          name: '项羽',
          value: '吾乃西楚霸王是也！',
          time: ''
        }
      ],
      ti:'翻译nice to meet you.',
      answer:'',
      date:[
      ]
    }
  },
  methods: {
    change () {
      if (this.flag) {
        clearInterval(this.num)
      } else {
        this.num = setInterval(() => {
          let str = this.text
          this.text = str.substr(5) + str.substr(0, 5)
        }, 500)
      }
      this.flag = !this.flag
    },
    add () {
      let num = this.thingList.length
      this.thingList.push({
        id: num,
        name: this.user,
        value: this.things,
        time: ''
      })
      this.things = ''
    }

  }
}
</script>
<style>
  *{
    margin:0;
    padding:0;

  }

  body{
    width: 100%;
    min-width: 1200px;
    font-family: "微软雅黑";
  }

  .header-list{
    list-style: none;  /*去掉列表前面的标记*/
    width: 100%;
    overflow: hidden;
  }

  .header-list li{
    float: left;
    line-height: 62px;
    margin:0 50px;
  }

  .header-list li:hover{
    background: #fff;
  }

  .header-list li a:hover{
    color: #000;
  }

  .header-list li a{
    text-decoration: none; /*清楚超链接的下划线*/
    color: #fff;
    padding: 0 10px;
    display:block;    /*使整体变成可点击区域 使a和li成为一个整体*/

  }

  .header{
    width: 100%;
    height: 62px;
    background: #333;
    min-width: 1200px;
    font-size: 14px;
  }

  .w1200{
    width: 1200px;
    height: 100%;
    padding:0 100px;
    margin:0 auto;
    box-sizing:border-box;
    position: relative;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-dropdown-link span:hover{
    cursor: pointer;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
