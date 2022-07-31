import {FC, useEffect, useState, useRef, useCallback, Suspense} from 'react';

export default () => {
    useEffect(() => {
      
    }, []);

    return (
        <div>main页面

            <Suspense>
                并发渲染
            </Suspense>
        </div>
    )
};