export default function ajax(url, xtmmethod, xtmbody = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            method: xtmmethod,
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }
        const baseUrl = 'http://xtm.xiaoyunqiang.top/'
        if (xtmmethod === 'POST') {
            const formBody = [];
            for (let key in xtmbody) {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(xtmbody[key]);
                formBody.push(`${encodedKey}=${encodedValue}`);
            }
            options.body = formBody.join('&')
        }

        fetch(
                baseUrl + url, options)
            .then(function(res) {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return reject(res.json());
                }
            })
            .then(function(data) {
                if (data.code === 0) {
                    resolve(data.data);

                }
            })
            .catch(function(err) {
                reject(err);
            });
    })
}