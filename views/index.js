import {FC, useEffect, useState, useRef, useCallback} from 'react';

import {ajax} from '../common/utils';
import Layout from '../components/myLayout'

export default () => {
    const [s, setS] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            setS(3);
            clearTimeout(timer);
        }, 3000);
    }, []);

    const clk = () => {
        ajax({
            url: 'http://127.0.0.1:3000/postapi/clk',
            method: 'post',
            data: {
                a: 1,
                b: 2
            }
        }).then(res => {
            console.log(res, '响应数据');
        }).catch(err => {
            console.log(err, '请求错误');
        });
    }

    const handle = () => {
        ajax({
            url: 'http://127.0.0.1:3000/postapi/handle',
            method: 'post',
            data: {
                a: 1,
                b: 2
            }
        }).then(res => {
            console.log(res, 'handle响应数据');
        }).catch(err => {
            console.log(err, 'handle请求错误');
        });
    }

    return (
        <Layout>
            <h1>
                主页-({s})
            </h1>
            <div className='main' style={{background: 'red'}}>
                页面主体
                <div onClick={clk}>按钮</div>
                <div onClick={handle}>发起请求</div>
            </div>
         </Layout>
    )
};