
import Vue from 'vue';
import dayjs from 'dayjs';
//本地化语言配置
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn') // 全局使用简体中文

//定义一个处理相对时间的全局过滤器
Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
});

//定义一个处理绝对事件的全局过滤器
Vue.filter('datetime', (value, formate ='YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(formate)
})

