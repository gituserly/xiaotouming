export default function todaytime() {
    const dateTamp = new Date()
    let year = dateTamp.getFullYear() - 2000;
    let month = dateTamp.getMonth() + 1;
    let date = dateTamp.getDate();
    let today = year + "/" + month + "/" + date;
    let hour = dateTamp.getHours();
    let min = dateTamp.getMinutes();
    // let s=date.getSeconds();
    if (min < 10) {
        min = "0" + min;
    }

    let todaytotime = today + " " + hour + ":" + min;
    return todaytotime;
}