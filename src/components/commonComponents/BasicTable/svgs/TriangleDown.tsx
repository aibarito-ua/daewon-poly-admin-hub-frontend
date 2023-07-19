import { SVGAttributes } from "react";

export function SvgTriangleDown(props: SVGAttributes<SVGElement>) {

    return(
        // <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        //     <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        //     <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        //     <g id="SVGRepo_iconCarrier"><path d="M6.5,8.5l6,7l6-7H6.5z"></path> 
            
        // </g></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" {...props}>
        <g id="arrow" transform="translate(1 1)">
            <rect id="guide" width="16" height="16" transform="translate(-1 -1)" fill="none" opacity="0.2"/>
            <path id="패스_25" data-name="패스 25" d="M0,5.165,4.816,0,9.358,5.165" transform="translate(12.005 10.212) rotate(180)" fill="none" stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
        </svg>

    )
}
