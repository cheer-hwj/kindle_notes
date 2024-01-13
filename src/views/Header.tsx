import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        color: #ffffff;
        background-color: #916ec9;
        box-shadow:rgba(85, 85, 85, 0.3) 0px 2px 10px 2px;
        min-height: 10vh;
        font-size: calc(5px + 2vmin);
        .btns div {
            display: inline-block;
            margin-left: 20px;
            font-size: .9em;
            cursor: pointer;
        }
        .clear-btn {
            padding: 5px 20px 6px 20px;
            color: #ffffff;
            border-radius: 20px;
            border: 1.5px solid #bebebe;
        }
        .clear-btn:hover {
            background-color: #a187ce;;
        }
        .copy-btn:hover {
            color: #c5b4e1;
        }
        .filename {
            max-width: 50vw;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
        }
`
export default function Header({ filename, handleCopy, handleClear }) {
    return <Wrapper>
        <div className='filename'>{filename}</div>
        <div className='btns'>
            <div className='copy-btn' onClick={handleCopy}>复制笔记</div>
            <div className='clear-btn' onClick={handleClear}>清空文件</div>
        </div>
    </Wrapper>
}