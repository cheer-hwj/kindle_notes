import React, { useState } from "react";
import styled from 'styled-components';
const Wrapper = styled.div`
    color: #916ec9;
    .inputFile { 
        position: relative;
        width: 100vw;
        height: 100vh;
    	color: #916ec9;
        background: #ededed;
	}
    input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        opacity: 0;
    }
    .input-tip {
        position: absolute;
        top: 35vh;
        left: 0;
        right: 0;
        color: #c5bed0;
        font-size: 8vh;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        pointer-events: none;
    }
    .book-type {
        position: absolute;
        top: 10vh;
        padding: 5px;
        width: 8em;
        color: #916ec9;
        background-color: #dbd5e4;
        font-size: 4vh;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        border-radius: 0 3px 3px 0;
    }
    .book-type:hover {
        background-color: #c5bed0;
    }
`
export default function InputView({ setFileTxt }) {
    const [isCN, setType] = useState(true);//默认为中文书
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target) {
            const curElem = event.target as HTMLInputElement
            const file = curElem.files && curElem.files[0]
            if (file) {
                const reader: FileReader = new FileReader()
                reader.readAsText(file);
                reader.onload = function (e) {
                    //如果是 Arraybuffer 则不处理
                    if (e.target && typeof e.target.result === 'string') {
                        setFileTxt({
                            name: file.name.replace('- Notebook.html', '').trim(),
                            txt: e.target.result,
                            isCN: isCN
                        });// 传给父元素
                        curElem.value = ''; //本地清空
                    }
                }
            }
        }
    }
    return <Wrapper>
        <div className="inputFile">
            <input type="file" onChange={handleChange} />
            <div className="input-tip">点击选择 或 拖拽放入笔记</div>
            <div className="book-type" onClick={() => setType(!isCN)}>{isCN ? '中文书' : '英文书'}</div>
        </div>
    </Wrapper>
}