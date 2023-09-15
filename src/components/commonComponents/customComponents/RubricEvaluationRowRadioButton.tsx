import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import useLearningManagementSparkWritingStore from "../../../store/useLearningManagementSparkWritingStore";

export default function RubricEvaluationRowRadioButton (props: {
    data:TRubricTypeDataItem;
    defaultSelectValue:string;
    controlValue: string[];
    controlFn: (idx: number, value: string) => void;
    categoryIdx: number;
    status:number;
}) {
    const {data,defaultSelectValue, categoryIdx, controlFn, controlValue, status}=props;
    const {
        rubricReportValue, setRubricReportValue
    } = useLearningManagementSparkWritingStore();
    // const [selectValue, setSelectValue] = React.useState<string>(defaultSelectValue);
    
    const labels:("excellent"|"very_good"|"good"|"fair"|"poor")[] = [
        "poor", "fair", "good", "very_good", "excellent"
    ]
    const groupName = 'rubric-evaluation-row-radio-buttons-group'
    const clickValues = (item:TRubricTypeHeaderAccessor) => {
        
        let descriptValue:string;
        if (item==='poor') {
            descriptValue=data.poor;
        } else if (item==='fair') {
            descriptValue=data.fair;
        } else if (item==='good') {
            descriptValue=data.good;
        } else if (item==='very_good') {
            descriptValue=data.very_good;
        } else if (item==='excellent') {
            descriptValue=data.excellent;
        } else {descriptValue=''}
        controlFn(categoryIdx, item)
        setRubricReportValue({category:data.category, selected_value:item, selected_value_description: descriptValue})
    }
    
    return (
        <FormControl sx={{
            width:'100%',
            height: '60px',
            display:'flex',
            paddingX: '60px',
        }}>
            <RadioGroup
                row
                name={groupName}
                sx={{
                    display:'flex',
                    width:'100%',
                    justifyContent: 'space-between'
                }}
            >
                {labels.map((item, itemIndex) => {
                    const labelItem = item.replace(/_/gmi, ' ');
                    const key = groupName+itemIndex
                    let selectCheck = false;
                    
                    return<FormControlLabel  key={key} value={labelItem}
                    checked={controlValue[categoryIdx]===item} control={
                        <Radio color="default" sx={{padding:'6px', color:controlValue[categoryIdx]===item ?'#0fa9cb':'#bbbbbb' }}/>
                    } label={labelItem}
                    labelPlacement="top"
                    sx={{}}
                    onClick={(status===2||status===3) ? ()=>clickValues(item): ()=>{}}
                    />

                    
                })}
            </RadioGroup>
        </FormControl>
    )
}