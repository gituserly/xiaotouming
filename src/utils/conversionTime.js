export default function conversionTime(timestamp, format = 'Y-M-D H:m:s') {
    //timestamp = 时间戳  format = 格式
    let data = timestamp.toString().length < 13 ? new Date(timestamp * 1000) : new Date(timestamp); //判断时间戳是否需要*1000
    let Y = data.getFullYear() - 2000; //获取传入时间戳的年
    let M = data.getMonth() + 1; //获取月份
    let D = data.getDate(); //获取当前天
    let H = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours(); //小时>10 时默认在前面加0
    let m = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes(); //分钟>10时默认在前面加0
    let s = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds(); //秒>10时默认在前面加0
    // format = format || 'Y-M-D H:m:s'; //设定一个默认格式
    format = format.includes('Y') ? format.replace('Y', Y) : format; // 2021-M-D H:m:s
    format = format.indexOf('M') > -1 ? format.replace('M', M) : format; //  2021-3-D H:m:s
    format = format.indexOf('D') > -1 ? format.replace('D', D) : format; //  2021-3-1 H:m:s
    format = format.indexOf('H') > -1 ? format.replace('H', H) : format;
    format = format.indexOf('h') > -1 ? format.replace('h', H > 12 ? H - 12 : H) : format; //传H则是24小时制 h则是12小时制
    format = format.indexOf('m') > -1 ? format.replace('m', m) : format;
    format = format.indexOf('s') > -1 ? format.replace('s', s) : format;
    return format;
}
//   conversionTime(1586087763000);//打印结果：2020-4-5 19:56:03
//   conversionTime(1586087763,"Y-M-D H:m:s");//打印结果：2020-4-5 19:56:03
//   conversionTime(1586087763,"Y/M/D h:m:s");//打印结果：2020/4/5 7:56:03