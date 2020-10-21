//高亮文本函数
const highlight = (str, replaceStr) => {
    //匹配关键字的正则
    let replaceReg = new RegExp(replaceStr, 'gi');
    //高亮替换v-html的值
    let replaceString = `<span style="color: red">${replaceStr}</span>`;
    //替换
    let highlightString = str.replace(replaceReg, replaceString);

    return highlightString;
}

export default highlight;