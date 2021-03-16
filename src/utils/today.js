export default function() {
    const dates = new Date()
    let month = dates.getMonth() + 1;
    let date = dates.getDate();
    let today = month + "月" + date + "日"
    return today

}