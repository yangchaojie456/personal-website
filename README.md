## 个人网站地址
http://yangchaojie.top/


























1、获取locationId 
https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api

2、正在售票
https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290

3、正在热映
https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290

4、即将上映
https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290

5、影片详情
https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=125805

6、演职员表
https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId=217896

7、人员详细信息
https://ticket-api-m.mtime.cn/person/detail.api?personId=892908&cityId=290

8、影片评论
https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=125805

9、mini更多短评
https://api-m.mtime.cn/Showtime/HotMovieComments.api?pageIndex=1&movieId=217896

10、更多精选影评
https://api-m.mtime.cn/Movie/HotLongComments.api?pageIndex=1&movieId=217896

11、预告片&花絮
https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId=217896

12、剧照
https://api-m.mtime.cn/Movie/ImageAll.api?movieId=217896


app.json


{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "navigationBarBackgroundColor": "#d64f4d",
    "navigationBarTitleText": "猫眼电影",
    "navigationBarTextStyle":"#fff6f6",    
    "backgroundTextStyle": "dark",
    "backgroundColor":"#f5f5f5",
    "enablePullDownRefresh":true
  }
}


index.json

{
  "navigationBarTitleText": "猫眼电影"
}

index.wxml

<view class="movies">
  <view class='nav'>
    <view  class='title_bar tc'>
      <view class='w25'>
        <text class='title'>上海</text>
      </view>
      <view  class='w25'>
        <text style='opacity:{{current_hot?1:0.7}}' class='title'>正在热映</text>
      </view>
      <view  class='w25'>
        <text style='opacity:{{current_hot?0.7:1}}' class='title'>即将上映</text>     
      </view>      
      <view  class='w25'>
        <icon class='search_icon' type='search' color='white' size='15'></icon>
      </view>
      
    </view>
    <view class='nav_bar'>
      <movable-area class="nav_bar_area">
        <movable-view class='nav_bar_view'
          x="{{navX}}" y="{{navY}}" 
          direction="horizontal"
          animation="{{false}}"
          disabled="{{true}}"
        >
        </movable-view>
      </movable-area>
    </view>    
  </view>
  <view class='content'>
    <movable-area class="w100">
      <movable-view class="w200"
        x="{{x}}" y="{{y}}" 
        direction="horizontal" inertia="{{true}}" 
        damping="{{400}}" friction="{{0.1}}" 
        bind:touchstart="movableStart" bindtouchmove="movableMove" 
        bindtouchend="movableEnd"  bindchange="onChange"
      >
      <view class='w50' >
          
          <scroll-view class='content_scroll' scroll-y 
          bindscrolltoupper="upper" 
          bindscrolltolower="lower" 
          bindscroll="scroll" 
          >
            <view id="green" class="scroll-view-item bc_green">1</view>
            <view id="red"  class="scroll-view-item bc_red">2</view>
            <view id="yellow" class="scroll-view-item bc_yellow">3</view>
            <view id="blue" class="scroll-view-item bc_blue">4</view>
          </scroll-view>
      </view>

      <view class='w50' >
          
          <scroll-view class='content_scroll' scroll-y 
          style="height: 200px;" 
          bindscrolltoupper="upper" 
          bindscrolltolower="lower" 
          bindscroll="scroll" 
          scroll-into-view="{{toView}}" 
          scroll-top="{{scrollTop}}"
          >
            <view id="green" class="scroll-view-item bc_green">1</view>
            <view id="red"  class="scroll-view-item bc_red">2</view>
            <view id="yellow" class="scroll-view-item bc_yellow">3</view>
            <view id="blue" class="scroll-view-item bc_blue">4</view>
          </scroll-view>
      </view>
      </movable-view>
    </movable-area>
  </view>
  
    
</view>



index.wxss

/**index.wxss**/
.w25{
  width: 25%;
}
.w50{
  width: 50%;
}
.w100{
  width: 100%;
}
.w200{
  width: 200%;
}
.tc{
  text-align: center;
}
.movies{
  height: 100vh;
  background: white;
}
.nav{
  background:#d64f4d;
  padding-bottom: 2rpx;
}
.title_bar{
  height: 6vh;
  line-height: 6vh;
  display: flex;
  justify-content: space-around;
}
.search_icon{
  line-height: 7vh;
  font-size: 15rpx;
}
.title{
  color:#fff6f6;
  font-size: 32rpx;
  transition: color .5s;
}
.nav_bar{
  height: 0.7vh;
  width: 100%;
  display: flex;
  justify-content: center;
}
.nav_bar_area{
  
  height: 0.7vh;
  width: 33%;
}
.nav_bar_view{
  height: 0.7vh;
  width: 60rpx;
  background: white;
  border-radius: 5rpx;
}
.content_scroll{
  background: #f5f5f5;  
  height: 93.3vh;
}
movable-view{
  display: flex;
  justify-content: flex-start;
}
.scroll-view-item{
  height: 540rpx;
}

index.js

var currentX= 0,
 currentY= 0,
 lastX= 0,
 lastY= 0,
 movableX= 0,
 movableY= 0,
 windowWidth= wx.getSystemInfoSync().windowWidth,
 navBarWidth= wx.getSystemInfoSync().windowWidth * 33 / 100,
 moveDirection= 'left';
Page({
  data: {
    x:0,
    y:0,
    navX:0,
    navY:0,
    current_hot:true,
    toView: 'red',
    scrollTop: 100
  }, 
  movableStart(e){
    // console.log(e.touches[0].pageX)
    // this.setData({
    //   currentX: e.touches[0].pageX,
    //   lastX: e.touches[0].pageX
    // })
  },
  movableMove(e) {
    
    // this.setData({
    //   currentX: e.touches[0].pageX,      
    // })
    // // 向左滑动
    // if(this.data.currentX<this.data.lastX){
    //   this.setData({
    //     moveDirection:'left'
    //   })
      
    // }
    // // 向右滑动
    // if (this.data.currentX > this.data.lastX) {
    //   this.setData({
    //     moveDirection: 'right'
    //   })
      
    // }
  },
  movableEnd(e) {
    // 手指滑动移开先让惯性滚动
    setTimeout(()=>{
      if (moveDirection == 'left') {
        if (movableX > windowWidth / 2) {
          this.setData({
            x: -windowWidth,
            y: 0,
            current_hot: false
          });
        } else {
          this.setData({
            x: 0,
            y: 0,
            current_hot:true
          });
        }
      } else {
        if (movableX < windowWidth / 2) {
          this.setData({
            x: 0,
            y: 0,
            current_hot: true
          });
        } else {
          this.setData({
            x: -windowWidth,
            y: 0,
            current_hot: false
          });
        }
      }
    },250)
      
  },

  onChange: function (e) {    
    // 判断向左向右滑
    
      currentX = Math.abs(e.detail.x)
    
    // 向左滑动
    if (currentX > lastX) {
      
        moveDirection= 'left'
      
    }
    // 向右滑动
    if (currentX < lastX) {
        moveDirection= 'right'
    }
    lastX = Math.abs(e.detail.x);
    movableX = Math.abs(e.detail.x);
    movableY = Math.abs(e.detail.y);

    this.setData({
      navX: (movableX / windowWidth) * navBarWidth,
      navY:0
    });    
  }  
})
