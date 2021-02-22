export default function ajax(url, xtmmethod, xtmbody) {
    return new Promise((resolve, reject) => {
        const baseUrl = "http://xtm.xiaoyunqiang.top/";
        fetch(baseUrl + url, {
                method: xtmmethod,
                body: JSON.stringify(xtmbody),
            })
            .then(function(res) {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return reject(res.json());
                }
            })
            .then(function(data) {
                console.log(12, data);
                if (data.code === 0) {
                    resolve(data);
                }
            })
            .catch(function(err) {
                reject(err);
            });
    });
}