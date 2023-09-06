import { SVGAttributes } from "react";

function SideMenuPlusSVGIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="11" height="11.001" viewBox="0 0 11 11.001">
    <g id="icon__" data-name="icon_+" transform="translate(-220 -533)">
        <g id="합치기_4" data-name="합치기 4" transform="translate(2566 971)" fill="#fff">
        <path d="M -2340.5 -427.4996032714844 L -2340.5 -432 L -2340.5 -432.4999084472656 L -2340.5 -432.9999084472656 L -2340.5 -437.5003051757812 L -2340.5 -432.9999084472656 L -2340.5 -432.4999084472656 L -2340.5 -432 L -2340.5 -427.4996032714844 Z" stroke="none"/>
        <path d="M -2340 -426.9996032714844 L -2341 -426.9996032714844 L -2341 -432 L -2346.000244140625 -432 L -2346.000244140625 -432.9999084472656 L -2341 -432.9999084472656 L -2341 -438.0003051757812 L -2340 -438.0003051757812 L -2340 -432.9999084472656 L -2334.999755859375 -432.9999084472656 L -2334.999755859375 -432 L -2340 -432 L -2340 -426.9996032714844 Z" stroke="none" fill="#999"/>
        </g>
    </g>
    </svg>
  );
}
function SideMenuMinusSVGIcon(props:SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
        <g id="icon_-" transform="translate(-220 -488)">
            <rect id="사각형_3492" data-name="사각형 3492" fill="none" width="11" height="11" transform="translate(220 488)"/>
            <rect id="사각형_512" data-name="사각형 512" fill="#999" width="11" height="1" transform="translate(220 493)"/>
        </g>
        </svg>

    )
}
function SideSubMenuOpenSVGIcon(props:SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
        <g id="그룹_2215" data-name="그룹 2215" transform="translate(-41 -577)">
            <path id="합치기_6" data-name="합치기 6" fill="#222" d="M-2352-478v-6h2v4h4v2Z" transform="translate(2393 1061)"/>
        </g>
        </svg>

    )
}
function SideSubMenuOpenActiveSVGIcon(props:SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6">
        <g id="그룹_2216" data-name="그룹 2216" transform="translate(-41 -577)">
            <path id="합치기_5" data-name="합치기 5" fill="#0fa9cb" d="M-2352-518v-6h2v4h4v2Z" transform="translate(2393 1101)"/>
        </g>
        </svg>

    )
}
function ClockTextSVGIcon (props:SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width={300} height={20} viewBox="0 0 300 20">
            <text x={50} y={20}>Close</text>
        </svg>
    )
}
function CloseImageSVGIcon(props:SVGAttributes<SVGElement>) {
    return (
        <svg {...props} id="bt_del" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
  <rect id="guide" fill="none" opacity="0.12" width="16" height="16" transform="translate(7 7)"/>
  <rect id="guide-2" data-name="guide" fill="none" opacity="0.12" width="30" height="30"/>
  <line id="모양_1_복사" data-name="모양 1 복사" fill="#3f3f3f" stroke="#333" strokeLinecap="round" strokeWidth="2px" x2="9.402" y2="0.085" transform="translate(11.618 18.787) rotate(-45)"/>
  <line id="모양_1_복사-2" data-name="모양 1 복사" fill="#3f3f3f" stroke="#333" strokeLinecap="round" strokeWidth="2px" y1="0.085" x2="9.402" transform="translate(11.678 12.138) rotate(45)"/>
</svg>
    )
}
export const commonSvgIcons = {
    SideMenuPlusSVGIcon,
    SideMenuMinusSVGIcon,
    SideSubMenuOpenSVGIcon,
    SideSubMenuOpenActiveSVGIcon,
    ClockTextSVGIcon,
    CloseImageSVGIcon
}