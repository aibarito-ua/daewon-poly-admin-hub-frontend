import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useLoginStore from "../store/useLoginStore";
import { NotAuth } from '../pages/NotAuth';

interface IPrivateRouteProps {
    children?: React.ReactElement;
    authenticated: boolean;
    pageAuth?: TRole
}
export default function PrivateRoute({
    authenticated, pageAuth
}:IPrivateRouteProps):any {
    const {role, employeeSttName, accessToken, clientCode, memberCode } = useLoginStore();
    
    if (authenticated) {
        // console.log('test = ',employeeSttName, accessToken, clientCode, memberCode)
        // const check1 = employeeSttName!=='';
        // const check2 = accessToken !== '';
        // const check3 = clientCode !== '';
        // const check4 = memberCode !== '';
        // if (check1 && check2 && check3 && check4) {
            return <Outlet />
        // } else {
        //     return <NotAuth />
        // }
        // // 권한 필요, 로그인 체크
        // if (role === null || role === undefined || role === 'logout') {
        //     // return <Navigate to="/" />
        //     return <NotAuth />
        // } else {
            
        //     if (role === 'Head') {
        //         // 본사 권한 접근
        //         return <Outlet />
        //     } else if (role === 'Campus') {
        //         // 갬퍼스 권한 접근
        //         if (pageAuth === role) {
        //             return <Outlet />
        //         } else {
        //             // No auth Page 
        //             // return <Navigate to="/" />
        //             return <NotAuth />
        //         }
        //     } else {
        //         //  전체 접근 가능
        //         if (pageAuth === role || pageAuth === 'Head' || pageAuth==='Campus' ) {
        //             return <Outlet />
        //         } else {
        //             // No auth Page 
        //             // return <Navigate to="/" />
        //             return <NotAuth />
        //         }
        //     }
        // }
    } else {
        // 권한 필요 x, 로그인 체크 x
        // return <Outlet />
        // return <Navigate to="/" />
        return <NotAuth />
    }
}