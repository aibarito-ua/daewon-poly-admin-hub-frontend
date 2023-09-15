import React from 'react';
interface IComponentToPrintProps {
    userInfo: TFeedbackStates;
    draft:number;
}
class ComponentToPrint extends React.PureComponent<IComponentToPrintProps> {
    
    render() {
        
        console.log('this=',this.props)
        const userInfo = this.props.userInfo;
        const dateCompleted_ori = userInfo.status_1st?.review_complete_date;
        const dateCompleted = dateCompleted_ori?.substring(2,10)
        console.log('dateCompleted =',dateCompleted)
        const draft_str = this.props.draft===1 ? '1st': '2st';
        let title = '';
        let body:JSX.Element[] = [];
        let bodyEachSpanHeight:string[] = [];
        const outlines:TFindDraftInfoByDraftIdDraftOutline[] = this.props.draft===1 ? userInfo.draft_data.draft_outline:userInfo.draft_2nd_data? userInfo.draft_2nd_data.draft_outline:[];
        for (let i = 0; i < outlines.length; i++) {
            if (outlines[i].name === 'Title') {
                title = outlines[i].input_content
            } else {
                if (this.props.draft === 1) {
                    let jsxBody = <span><span className='pl-[2.64583mm]' />{outlines[i].input_content}</span>;
                    // jsxBody
                    console.log('jsxBody =',jsxBody)
                    body.push(jsxBody);
                    body.push(jsxBody);
                } else {
                    const bodyText = outlines[i].input_content.split('\n\n');
                    body = bodyText.map((item,itemIdx ) => {
                        return <span key={'print-component-'+this.props.draft+'-'+itemIdx}><span className='pl-[1.05833mm]'></span>{item}</span>
                    })
                }
            }
        }
        let allBody = <div className='export-lm-wh-content-body'>{body}</div>;
        
      return (
        <div className='print-container'>
            <div className='w-full h-full bg-[#f7fcfe] px-[13.22917mm] pt-[13.22917mm]'>

                {/* head */}
                <div className='export-lm-wh-draft-info-div h-[37.04167mm] w-full'>
                    
                    <div className='flex flex-col w-[32.54375mm] h-[18.52083mm] ml-[6.614583mm] mt-[9.260417mm] gap-[1.534583mm]'>
                        <div className='flex flex-row gap-[4px] w-full h-[10.63625mm]'>
                            <div className='w-[8.7047916mm] h-full bg-contain bg-center bg-no-repeat bg-svg-ic-writing'/>

                            <div className='flex flex-col w-[22.75417mm] h-[8.202083mm] pt-[1.05833mm]'>
                                <div className='export-lm-wh-font-gothamrounded' style={{
                                    fontSize: '3.704167mm',
                                    lineHeight: '4.23333mm'
                                }}>Writing Hub</div>
                                <div className='export-lm-wh-font-sub-title' style={{
                                    fontSize: '2.64583mm',
                                    lineHeight:'3.96875mm'
                                }}>spark writing</div>
                            </div>

                        </div>
                        <div className='flex flex-row w-full h-[6.35mm]'>
                            <div className='flex items-center justify-center rounded-[3.175mm] w-full h-full bg-[#0fa9cb]'>
                                <span className='export-lm-wh-font-step-span' style={{
                                    fontSize: '2.910417mm'
                                }}>1st draft</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row w-[133.87916mm] h-[25.135416mm] ml-[6.614583mm] mt-[5.82083mm] gap-[5.291667mm]'>
                        <div className='flex flex-col w-full h-full gap-[3.96875mm]'>

                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>level</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.level.name}</span>
                            </div>
                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>book</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.book_name}</span>
                            </div>
                        </div>

                        <div className='flex flex-col w-full h-full gap-[3.96875mm]'>
                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>class</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.class.name}</span>
                            </div>
                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>unit</span>
                                <span className='export-lm-wh-font-value'>{`Unit ${userInfo.defautInfo.unit_index}`}</span>
                            </div>
                        </div>

                        <div className='flex flex-col w-full h-full gap-[3.96875mm]'>
                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>student</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.student_name.student_name_kr}</span>
                            </div>
                            <div className='flex flex-col gap-[1.05833mm]'>
                                <span className='export-lm-wh-font-label'>date completed</span>
                                <span className='export-lm-wh-font-value'>{`${draft_str} : ${dateCompleted}`}</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* draft contents */}
                <div className='export-lm-wh-draft-info-div mt-[2.64583mm] h-[236.536mm] relative z-10'>
                    <div className='export-lm-wh-content-title-deco z-0'/>
                    <div className='export-lm-wh-content-title z-10'>
                        <span className='export-lm-wh-content-title-value'>Title:</span>
                        <span className='export-lm-wh-content-title-value'>{title}</span>
                    </div>
                    {allBody}
                </div>
            </div>
        </div>
      );
    }
}
export default ComponentToPrint;