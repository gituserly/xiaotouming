export default function() {
    const riqi = new Date();
    let month = riqi.getmonth() + 1
    let date = riqi.getdate()
    let todayprc = month + "yue" + date + "ri"
    return todayprc
}
getToday = () => {
    this.setstate({ today: prc() })
    setTimeout(() => { this.getToday(), 1000 })
}