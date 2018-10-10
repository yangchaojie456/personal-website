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
    <view class='title_bar tc'>
      <view class='w25'>
        <text class='title'>上海</text>
      </view>
      <view class='w25'>
        <text style='opacity:{{current_hot?1:0.7}}' class='title' bindtap='toHotMovies'>正在热映</text>
      </view>
      <view class='w25'>
        <text style='opacity:{{current_hot?0.7:1}}' class='title' bindtap='toWillMovies'>即将上映</text>
      </view>
      <view class='w25'>
        <icon class='search_icon' type='search' color='white' size='15'></icon>
      </view>

    </view>
    <view class='nav_bar'>
      <movable-area class="nav_bar_area">
        <movable-view class='nav_bar_view' x="{{navX}}" y="{{navY}}" direction="horizontal" animation="{{true}}" damping="{{200}}" friction="{{0.1}}" disabled="{{true}}">
        </movable-view>
      </movable-area>
    </view>
  </view>
  <view class='content'>
    <movable-area class="w100">
      <movable-view class="w200" x="{{x}}" y="{{y}}" direction="horizontal" inertia="{{true}}" damping="{{100}}" friction="{{0.1}}" bind:touchstart="movableStart" bindtouchmove="movableMove" bindtouchend="movableEnd" bindchange="onChange">
        <!-- 正在热映 -->
        <view class='w50 hot_movies'>
          <scroll-view id="hot_scroll" class='content_scroll' scroll-y lower-threshold="200" bindscrolltoupper="hot_movies_upper" bindscrolltolower="hot_movies_lower" bindscroll="hot_movies_scroll">
          <!-- 列表项 -->
          <view class='hot_movies_list'>
            
            <view class='hot_movies_item'  wx:for="{{hot_movies_list}}">
              <navigator url="" hover-class="">
                <image mode="aspectFit" lazy-load="{{true}}" src="{{item.img}}"></image>
              </navigator>
              <navigator class='hot_movies_item_content' id='{{index==0?"the-id":""}}'>
                <view>
                  <view class='title'><text>{{item.t}}</text></view>
                  <view class='rate'>评分 <text>{{item.r}}</text></view>
                  <view class='actor'>主演：{{item.actorStr}}</view>
                  <view class='nearestShow'>今天{{item.NearestCinemaCount}}家影院放映{{item.NearestShowtimeCount}}场</view>
                </view>
                <navigator class='buy'>
                  <text>购票</text>
                </navigator>
              </navigator>
              
            </view>
            
          </view>
          </scroll-view>
        </view>
        <!-- 即将上映 -->
        <view class='w50'>

          <scroll-view class='content_scroll' scroll-y style="height: 200px;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}">
            <view id="green" class="scroll-view-item bc_green">1</view>
            <view id="red" class="scroll-view-item bc_red">2</view>
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
  background: rgb(245, 245, 245);  
  height: 93vh;
}
movable-view{
  display: flex;
  justify-content: flex-start;
}
.hot_movies_item{
  height: 250rpx;
  /* padding: 30rpx 0; */
  padding-left: 40rpx;
  font-size: 28rpx;
  display: flex;
  color:#666;
  align-items: center;
}
.hot_movies_item image{
  height: 200rpx;
  width: 142rpx;
  border-radius: 10rpx;
}
.hot_movies_item .title{
  font-size: 34rpx;
  font-weight: bold;
  color:black;
  line-height: 50rpx;
}
.hot_movies_item .rate{
  line-height: 60rpx;
}
.hot_movies_item .rate text{
  font-size: 32rpx;
  color:#ecac3c;
}
.hot_movies_item .actor,.hot_movies_item .nearestShow{
  line-height: 40rpx;
  width:415rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;

}
.hot_movies_item .hot_movies_item_content{
  display: flex;
  margin-left: 20rpx;
  width: 512rpx;
  justify-content: space-between;
  border-bottom: 1rpx solid #bbb;
  height: 224rpx;
  padding-top: 25rpx;
}
.hot_movies_item .hot_movies_item_content .buy{
  background:#f34d41;
  color: white;
  width:100rpx;
  height:60rpx;
  text-align:center;
  line-height:60rpx;
  border-radius:30rpx;
  margin-top: 75rpx;
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

var query = null
Page({
  data: {
    x:0,
    y:0,
    navX:0,
    navY:0,
    current_hot:true,
    toView: 'red',
    scrollTop: 100,
    hot_movies_list:[]
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
  },
  // 正在热映
  hot_movies_scroll(e){
    // console.log(e)
    query.exec(function (res) {
      console.log(res)
    })
  },
  // 正在热映触顶
  hot_movies_upper(e){
    // console.log(e)
  },
  // 正在热映触底
  hot_movies_lower(e){
    // console.log(e)
  },
  init_hot_movies(){    
    var that = this
    wx.request({
      url: 'https://api-m.mtime.cn/Showtime/LocationMovies.api', //仅为示例，并非真实的接口地址
      data: {
        locationId: 290
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.ms)
        
        var array = []
        array = res.data.ms.map(item=>{
          return Object.assign(item, { 'actorStr': item.actors.split(' / ').slice(0, 3).join(',')})
        })
          
        that.setData({
          hot_movies_list: array
        })
        console.log(that.data.hot_movies_list)
      }
    })
  },
  toHotMovies(){
    this.setData({
      x: 0,
      y: 0,
      current_hot: true
    });
  },
  toWillMovies(){
    this.setData({
      x: -windowWidth,
      y: 0,
      current_hot: false
    });
  },
  onReady(){
    console.log(this)
    this.init_hot_movies()
    query = wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect()
    query.select('#hot_scroll').boundingClientRect()
    
    
  }
})
