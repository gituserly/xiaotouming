export default function ajax(url, xtmmethod, xtmbody = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      method: xtmmethod,
      headers: {
        token: localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }
    const baseUrl = 'http://xtm.xiaoyunqiang.top/'
    if (xtmmethod === 'POST') {
      const formBody = []
      for (let key in xtmbody) {
        const encodedKey = encodeURIComponent(key)
        //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
        const encodedValue = encodeURIComponent(xtmbody[key])
        formBody.push(`${encodedKey}=${encodedValue}`)
        // document.write(encodeURIComponent("http://www.w3school.com.cn"))
        // document.write("<br />")
        // document.write(encodeURIComponent("http://www.w3school.com.cn/p 1/"))
        // document.write("<br />")
        // document.write(encodeURIComponent(",/?:@&=+$#"))

        // http%3A%2F%2Fwww.w3school.com.cn
        // http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
        // %2C%2F%3F%3A%40%26%3D%2B%24%23
      }
      options.body = formBody.join('&')
      // join() 方法用于把数组中的所有元素放入一个字符串。如果省略该参数，则使用逗号作为分隔符。
      // var arr = new Array(3)
      // arr[0] = "George"
      // arr[1] = "John"
      // arr[2] = "Thomas"

      // document.write(arr.join("."))
      // George.John.Thomas
      // George,John,Thomas 省略参数
    }

    fetch(baseUrl + url, options)
      .then(function (res) {
        if (res.status === 200) {
          return res.json()
        } else {
          return reject(res.json())
        }
      })
      .then(function (data) {
        if (data.code === 0) {
          resolve(data.data)
        } else {
          reject(data)
        }
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
