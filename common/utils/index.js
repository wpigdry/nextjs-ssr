/**
 * @file 公共函数库
 */

export const ajax = ({
        url,
        method,
        data
    }) => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText)
                    console.log(xhr.responseText);
                }
                else {
                    reject(`错误信息: ${xhr.responseText}`);
                }
            }
        }
        const params = Object.keys(data).map(item => item + '=' + data[item]).join('&');
        xhr.open(method, url);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    })
    
};
