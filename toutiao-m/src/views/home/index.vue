<template>
    <div class="home">
         <van-nav-bar
            class="home-nav-bar"
            @click-right="$router.push({name: 'login-question'})"
            @click-left="$router.back()"
        >
            <van-button 
                slot="title" 
                icon="search" 
                class="searth-btn"
                color="#5babfb"
                type="info"
                to="/search"
                round 
                size="small">
                搜索
            </van-button>
        </van-nav-bar>
        <!-- 文章频道列表开始 -->
        <van-tabs v-model="active" class="home-tabs" :border="true">
            <van-tab 
                :title="channel.name"
                v-for="channel in channels"
                :key="channel.id"
            >
            <!-- 文章列表开始 -->
                <article-list :channel="channel" />
            <!--文章列表结束  -->
            </van-tab>
            <div slot="nav-right"  
                class="wap-nav-wrap"
                @click="isChannelEditShow = true"
            >
                <van-icon name="wap-nav" />
            </div>
        </van-tabs>
        <!-- 文章频道列表结束 -->
        <!-- 频道编辑开始 -->
        <van-popup
            v-model="isChannelEditShow"
            round
            position="bottom"
            class="channel-edit-popup"
            close-icon-position="top-left"
            get-container="body"
        >
            <div class="popup-close-wrap">
                <van-icon name="cross" class="popup-close" @click="isChannelEditShow = false" />
            </div>
            <!-- 模板中的$event表示事件参数 -->
            <channel-edit 
                :channels="channels" 
                :active="active"
                @closeChannelPopup="isChannelEditShow = false" 
                @changeActive="active = $event"
            />
        </van-popup>
        <!-- 频道编辑结束 -->
    </div>
</template>

<script>
import { getUserChannerls } from '@/api/user'
import ArticleList from './components/article-list';
import ChannelEdit from './components/channel-edit';
import { mapState } from 'vuex';
import  store  from 'store';
 
    export default {
        data() {
            return {
                active: 1,
                channels: [],
                isChannelEditShow: false //频道编辑列表状态
            }
        },
        components: {
            ArticleList,
            ChannelEdit
        },
        computed: {
            ...mapState(['user'])
        },
        created () {
            this.loadChannels();
            console.log(this);
        },
        methods: {
           async loadChannels() {
               let defaultChannels = [];
               if (this.user) {
                   //已登录，请求获取线上的用户频道列表数据
                    const { data } = await getUserChannerls();
                    defaultChannels = data.data.channels;
               } else {
                   //没有登录，判断是否有本地存储的频道列表数据
                    const localChannels = store.get('user-channels');
                   if (localChannels) {
                       //如果有本地存储的列表数据
                        defaultChannels = localChannels;
                   } else {
                       //用户没有登录，也没有本地存储的列表数据，就请求获取默认推荐的频道列表
                        const { data } = await getUserChannerls();
                        defaultChannels = data.data.channels;
                   }
               }

               this.channels = defaultChannels;
                
           },
        },
    }
</script>

<style lang="less" scoped>
.pop {
    height: 300px;
    
    .div {
        height: 900px;
        overflow-y: scroll;
    }
}
.popup-close-wrap {
    height: 40px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    z-index: 999;
    .popup-close {
        margin-left: 10px;
        margin-top: 10px;
    }
}
.home-nav-bar {
    background-color: #3296fa;
    .searth-btn {
        width: 277.5px;
        height: 32px;
        font-weight: normal;
    }
    /deep/.van-nav-bar__title {
        max-width: none;
    }
    /deep/.van-icon-search {
        color: #fff;
        font-size: 16px;
    }
}
/deep/ .van-tabs__line {
  z-index: 0;
}
.channel-edit-popup {
    height: 95%;
}
.van-popup--bottom.van-popup--round{
    border-radius: 4px;
}
.wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 30px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, rgba(255, 255, 255, .7) 1%,#fff, #fff);
    text-align: center;
    .van-icon {
        color: #999;
    }
}
</style>