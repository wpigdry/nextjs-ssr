// https://jools.dev/nextjs-_appjs-example
const Myapp = ({Component, pageProps}) => {
    console.log('加载Myapp');
    // pageProps prop 是每个页面在渲染时会收到的 props 。重要的是要记住传递这些信息
    // ErrorBoundary  还可用ErrorBoundary包裹监听错误
    return (<Component {...pageProps}/>)
}

export default Myapp;
