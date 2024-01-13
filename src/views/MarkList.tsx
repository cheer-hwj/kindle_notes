import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    padding: 80px 20px 20px 20px;
    .chapter-name {
        margin: 40px 0 -25px 20px;
        font-size: 45px;
        font-weight: bold;
        color: #e2dbed;
    }
    .mark-item {
        margin: 20px;
        border-radius: 3px;
        color: #6d5f81;
        background-color: #f0ecf6;
    }
    .mark-info {
        display: inline-block;
        padding: .5em 1em .7em .7em;
        font-size: .8em;
        font-weight: bold;
        color: #916ec9;
        border-radius: 3px 0px 10px 0px;
        background: #e2dbed;
    }
    .mark-item p {
        margin: 0;
        padding: 20px 40px 30px 40px;
    }
    .remark {
        margin: -20px 20px 20px 20px;
        color: #9a7f91;
        border-top: 1px dashed #ff68cf;
        border-left: 4px solid #ff68cf;
        background-color: #f6ecf4;
    }
    .remark p {
        padding: 0 40px 30px 40px;
        color: #503f67;
        font-size: .9em;
    }
    .remark .mark-info {
        color: #d64baa;
        background: none;
    }
`
interface MarkItem {
    chapterName?: string,
    markLines?: [];
}
export default function markList({ marks }) {
    if (!Array.isArray(marks) || marks.length === 0) {
        return <div></div>
    }
    let markIndex = 0;
    return <Container>{marks.map((val: MarkItem, index: number) => {
        const { chapterName, markLines } = val;
        return <div key={index}>
            <div className='chapter-name'>{chapterName}</div>
            {markLines?.map((mark, key) => {
                const { pageNum, isMarking, markContent } = mark;
                if (isMarking) markIndex++;
                return <div key={key} className={"mark-item" + (isMarking ? '' : ' remark')}>
                    <div className='mark-info'>
                        {isMarking ? '标注页数：' + pageNum : '备注'}
                    </div>
                    <p>{isMarking ? markIndex + '. ' : ''}{markContent}</p>
                </div>
            })}
        </div>

    })}</Container>
}