import React from 'react';
interface IComponentToPrintProps {
    userInfo: TFeedbackStates;
    draft:number;
    title:string;
    body:JSX.Element;
    multi?: {
        currentPageNum:number;
        maxPageNum: number;
    }
}
class ComponentToPrint extends React.PureComponent<IComponentToPrintProps> {
    
    render() {
        
        // console.log('this=',this.props)
        const userInfo = this.props.userInfo;
        const dateCompleted_ori = userInfo.status_1st?.review_complete_date;
        const dateCompleted = dateCompleted_ori?.substring(2,10)
        // console.log('dateCompleted =',dateCompleted)
        const draft_str = this.props.draft===1 ? '1st': '2st';
        const body = <div className='export-lm-wh-content-body'>{this.props.body}</div>
        
      return (
        <div className='print-container'>
            <div className='w-full h-full bg-[#f7fcfe] px-[13.22917mm] pt-[12.093mm]'>

                {/* head */}
                <div className='export-lm-wh-draft-info-div h-[33.86mm] w-full'>
                    
                    <div className='flex flex-col w-[32.54375mm] h-[16.93mm] ml-[6.614583mm] mt-[8.465mm] gap-[1.534583mm]'>
                        <div className='flex flex-row gap-[4px] w-full h-[10.63625mm]'>
                            <div className='w-[8.7047916mm] h-full bg-contain bg-center bg-no-repeat bg-svg-ic-writing'/>

                            <div className='flex flex-col w-[22.75417mm] h-[8.202083mm] pt-[0.967mm]'>
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

                    <div className='flex flex-row w-[133.87916mm] h-[22.976mm] ml-[6.614583mm] mt-[5.321mm] gap-[5.291667mm]'>
                        <div className='flex flex-col w-full h-full gap-[3.628mm]'>

                            <div className='flex flex-col gap-[0.967mm]'>
                                <span className='export-lm-wh-font-label'>level</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.level.name}</span>
                            </div>
                            <div className='flex flex-col gap-[0.967mm]'>
                                <span className='export-lm-wh-font-label'>book</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.book_name}</span>
                            </div>
                        </div>

                        <div className='flex flex-col w-full h-full gap-[3.96875mm]'>
                            <div className='flex flex-col gap-[0.967mm]'>
                                <span className='export-lm-wh-font-label'>class</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.class.name}</span>
                            </div>
                            <div className='flex flex-col gap-[0.967mm]'>
                                <span className='export-lm-wh-font-label'>unit</span>
                                <span className='export-lm-wh-font-value'>{`Unit ${userInfo.defautInfo.unit_index}`}</span>
                            </div>
                        </div>

                        <div className='flex flex-col w-full h-full gap-[3.96875mm]'>
                            <div className='flex flex-col gap-[0.967mm]'>
                                <span className='export-lm-wh-font-label'>student</span>
                                <span className='export-lm-wh-font-value'>{userInfo.defautInfo.student_name.student_name_kr}</span>
                            </div>
                            <div className='flex flex-col gap-[0.967mm]'>
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
                        <span className='export-lm-wh-content-title-value'>{this.props.title}</span>
                    </div>
                    {/* page numbering */}
                    {this.props.multi && (
                        <div className={this.props.multi.maxPageNum!==1 ? 'export-lm-wh-draft-info-numbering-div':'hidden'}>
                            <span>{`${this.props.multi.currentPageNum} / ${this.props.multi.maxPageNum}`}</span>
                        </div>
                    )}
                    {this.props.body}
                </div>
            </div>

        </div>
      );
    }
}
export default ComponentToPrint;