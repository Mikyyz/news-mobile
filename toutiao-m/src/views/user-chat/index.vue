<template>
    <div class="user-chat">
        <!-- 头部 -->
        <van-nav-bar
            class="chat-header"
            title="智能聊天"
            left-arrow
            @click-left="$router.back()"
        />
        <van-cell-group class="chat-message">
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-cell-group :border="false" class="message-input">
            <van-field v-model="message" placeholder="请输入信息" class="input-field" />
            <van-button type="info" size="small" @click="onSend">发送</van-button>
        </van-cell-group>
        
    </div>
</template>

<script>
import io from 'socket.io-client';
    export default {
        data() {
            return {
                message: '',
                socket: null //websocket通信对象
            }
        },
        created () {
            //const socket = io('http://ttapi.research.itcast.cn');
            //this.socket = socket; //websocket通信对象
            // 建立通信连接
            // socket.on('connect', function(){
            //     console.log('已建立连接')
            // });
            // // 监听message消息，接收服务端消息
            // socket.on('message', function(data){
            //     console.log(data)
            // });
            // //断开连接
            // socket.on('disconnect', function(){
            //     console.log('已断开连接')
            // });
        },
        methods: {
            onSend() {
                this.socket.on('message', {
                    msg: this.message,
                    timestamp: Date.now()
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.chat-header {
    background-color: #3296fa;
    /deep/.van-icon-arrow-left, /deep/.van-nav-bar__title {
        color: #fff;
    }   
}
.chat-message {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 49px;
    overflow-y: auto;
}
.message-input {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    .van-field {
        height: 40px;
        background-color: aliceblue;
    }
    /deep/.van-button--info {
        width: 70px;
        height: 40px;
        line-height: 40px;
        border-radius: none;
        font-size: 12px;
    }
}
</style>