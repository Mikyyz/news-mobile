<template>
    <div class="channel-edit">
        <van-cell :border="false" >
            <div slot="title">
                <span class="channel-title">我的频道</span>
                <span class="channel-subtitle">点击进入频道</span>
            </div>
            <div @click="isEditChange" class="isEdit-text">
                {{isEdit ? "完成" : "编辑"}}
            </div>
        </van-cell>
        <div  class="channel-item">
                <van-button 
                    v-for="(channel,index) in channels" 
                    :key="channel.name"
                    :class="{active: index === active && !isEdit}"
                    type="primary" 
                    size="small" 
                    color="#f2f2f2" 
                    @click="onUserChannelClick(channel, index)"
            >
                    {{ channel.name }}
                    <van-icon v-if="isEdit && index !== 0" name="cross" />
                    <div class="dot" v-if="channel.isClicked && !isEdit"></div>
                </van-button>
            </div>
        <van-cell :border="false" >
            <div slot="title">
                <span class="channel-title">为你推荐</span>
                <span class="channel-subtitle">点击添加频道</span>
            </div>
        </van-cell>
        <div  class="recommend-item-wrapper">
            <div class="recommend-item-list">
                <van-button  
                    size="small"  
                    style="margin-right: 28px" 
                    v-for="item in recommendChannels" 
                    :key="item.id"
                    @click="onAdd(item)"
                >
                    {{item.name}}
                    <van-icon  name="plus" />
                </van-button>
            </div>
        </div>
        <div ref="wrapper" class="wrapper">
            <div ref="recommandContent" class="recommand-content" >
                <div :class="`recommand-item ${item.wrapperClass}`" v-for="(item, index) in recommandList" :key="index">
                    <div class="recommand-item-top">
                        <span :class="`left ${item.itemClass}`"><van-icon :name="`${item.iconName}`" /></span>
                        <span class="text">{{item.text}}</span>
                        <span class="plus"><van-icon name="plus" /></span>
                    </div>
                    <div class="recommand-item-desc">{{item.desc}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex';
import store from 'store';
    export default {
        data() {
            return {
                isEdit: false,
                show: true,
                recommandList: [
                    {
                        wrapperClass: 'audio',
                        itemClass: 'audio-left',
                        iconName: 'audio',
                        text: '音频',
                        desc: '头条FM你的知心朋友'
                    },
                    {
                        wrapperClass: 'media',
                        itemClass: 'media-left',
                        iconName: 'volume',
                        text: '传媒',
                        desc: '自媒体人的创作攻略'
                    },
                    {
                        wrapperClass: 'animal',
                        itemClass: 'animal-left',
                        iconName: 'umbrella-circle',
                        text: '动物',
                        desc: '呆萌可爱的动物世界'
                    },
                    {
                        wrapperClass: 'fishing',
                        itemClass: 'fishing-left',
                        iconName: 'medal',
                        text: '钓鱼',
                        desc: '交流钓鱼器材心得'
                    },
                    {
                        wrapperClass: 'star',
                        itemClass: 'star-left',
                        iconName: 'star',
                        text: '星座',
                        desc: '星座运势与性格解析'
                    }
                ],
                allChannels: []
            }
        },
        props: {
                channels: {
                    type: Array,
                    required: true 
                },
                active: {
                    type: Number,
                    required: true
                }
            },
        created () {
            this.loadAllCahnnels();
        },
        computed: {
            //推荐列表计算属性
            recommendChannels() {
                return this.allChannels.filter(channel => {
                    return !this.channels.find(item => {
                        return item.id === channel.id
                    })
                }) 
            },
            ...mapState(['user'])
        },
        methods: {
            isEditChange() {
                this.isEdit = !this.isEdit;
            },
            initScroll() {
                // 给内层盒子设置宽度，不设置宽度的话无法滚动
                let width = this.recommandList.length * 170 - 10;
                this.$refs.recommandContent.style.width = width + 'px';

                this.$nextTick(() => {
                    if(!this.Scroll) {
                        this.Scroll = new BScroll(this.$refs.wrapper, {
                            click: true, //配置允许点击事件
                            scrollX: true,//开启横向滚动
                            eventPassthrough: 'vertical'  // 当设置 eventPassthrough 为 'vertical' 的时候，scrollY 无效
                        })
                    } else {
                        this.Scroll.refresh() ;// 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
                    }
                })
            },
            async loadAllCahnnels() {
                const { data } = await getAllChannels();
                this.allChannels = data.data.channels;
            },
            async onAdd(item) {
                this.channels.push(item);
                // 持久化数据
                if(this.user) {
                    //已经登录了书记存储发到线上
                    await addUserChannel({
                        channels: [
                            {id: item.id, seq: this.channels.length}
                        ]
                    })
                } else {
                    //未登录数据存储到本地
                    store.set('user-channels', this.channels);
                }
                item.isClicked = true;
            },
            onUserChannelClick(channel, index) {
                if(this.isEdit && index !== 0) {
                    //编辑状态，删除频道
                    this.deleteChannel(channel, index);
                } else {
                    //非编辑状态切换频道
                    this.switchChannel(channel, index);
                }
            },
            async deleteChannel(channel, index) {
                //console.log('删除频道');
                this.channels.splice(index, 1);
                //数据持久化
                if(this.user) {
                    //登录了,就存到线上
                    await deleteUserChannel(channel.id);
                } else {
                    //没有登录
                    store.set('user-channels', this.channels)
                }
            },
            switchChannel(channel, index) {
                //将isClicked设置为false
                channel.isClicked = false;
                //console.log('切换频道')
                this.$emit('changeActive', index)
                this.$emit('closeChannelPopup')
            }
        },
        mounted () {
            this.initScroll();
        },
    }
</script>

<style lang="less" scoped>

.channel-edit {
    padding: 50px 0;
    overflow-x: hidden;
    .isEdit-text {
        color: #1989fa;
    }
    .channel-title {
        font-size: 19px;
    }
    .channel-subtitle {
        font-size: 12px;
        margin-left: 8px;
        color: #949494;
    }
    .channel-item {
        margin:10px 15px;
        position: relative;
        .van-button--primary {
            margin:5px 30px 5px 0;
        }
        .active {
            .van-button__text {
                 color: red;
            }
        }
        .dot {
            position: absolute;
            height: 6px;
            width: 6px;
            border-radius: 100%;
            background-color: red;
            right: 2px;
            top: 2px;
        }
    }
    .van-button--small {
        position: relative;
        width: 85px;
        height: 38px;
        line-height: 35px;
        .van-button__text {
            color: #242424;
        }
        .van-icon-cross {
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: 10px;
        }
    }
    .recommend-item-wrapper {
        margin:0 15px 10px;
        .van-button--default {
            margin:5px 2px;
        }
        .van-icon-plus {
            position: absolute;
            right: 2px;
            top: 2px;
        }
    }
    .wrapper {
        width: 100%;
        margin-left: 15px;
        touch-action: none;
    }
    .recommand-content {
        display: flex;
        overflow: hidden;
    }
    .recommand-item {
        width: 125px;
        height: 40px;
        border-radius: 3px;
        padding: 15px;
        margin-right: 10px;
        .recommand-item-top {
            display: flex;
            align-items: center;
            .left {
                width: 25px;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                .van-icon {
                    color: #fff;
                    font-size: 20px;
                }
            }
            .text {
                color: #3e383c;
                font-size: 16px;
                flex: 1;
                margin-top: -4px;
            }
            .plus {
                font-size: 16px;
            }
        }
        .recommand-item-desc {
            font-size: 12px;
            color: #9e9fa1;
            margin-top: 3px;
        }
        &.audio {
            background-color: #fdf4f5;
            .audio-left {
                background-color: #ef7a70;
            }
        }
        &.media {
            background-color: #f4fafa;
            .media-left {
                background-color: #68c6c6;
            }
        }
        &.animal {
            background-color: #fdf8f4;
            .animal-left {
                background-color: #e69a5e;
            }
        }
        &.fishing {
            background-color: #fdf8f4;
            .fishing-left {
                background-color: #eaa36b;
            }
        }
        &.star {
            background-color: #f7f4fd;
            .star-left {
                background-color: #b482f1;
            }
        }
    }
}
</style>