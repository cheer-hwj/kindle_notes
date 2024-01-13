import React, { useState } from "react";
// @ts-ignore
import handleContent from "./handleContent.ts";
// @ts-ignore
import InputView from "./InputView.tsx";
// @ts-ignore
import Header from './Header.tsx';
// @ts-ignore
import MarkList from './MarkList.tsx';

export default function Marks() {
    interface MarkItem {
        chapterName?: string,
        markLines?: [];
    }
    const initialMarks: MarkItem[] = [];// 笔记初始值
    const [marks, setMarks] = useState(initialMarks); // 处理后的笔记信息

    const initialData = { name: '', txt: '' }; // 数据初始值
    const [data, setData] = useState(initialData); // 获取文本数据

    const setFileTxt = ({ name, txt, isCN }) => {
        setData({ name: name, txt: txt });
        // 处理文档
        const content: MarkItem[] = handleContent(txt, isCN);
        setMarks(content);
    }
    const handleClear = () => {
        setData(initialData);
        setMarks(initialMarks);
    }
    const handleCopy = () => {
        let copyStr = '';
        let markIndex = 0;
        for (let index in marks) {
            const markItem = marks[index];
            if (markItem) {
                if (markItem.chapterName) {
                    copyStr += '\n## ' + markItem.chapterName; // 用于markdown的标题记法
                }
                if (Array.isArray(markItem.markLines)) {
                    for (let i = 0; i < markItem.markLines.length; i++) {
                        const { isMarking, markContent } = markItem.markLines[i];
                        if (!isMarking) {
                            copyStr += '\n备注：' + markContent;
                        } else {
                            markIndex++;
                            copyStr += '\n' + markIndex + '. ' + markContent;
                        }
                    }
                }
            }
        }
        if (copyStr) {
            navigator.clipboard.writeText(copyStr).then(() => {
                alert('内容已复制到剪切板！')
            }, () => {
                alert('复制失败，请稍后再试！')
            })
        } else {
            alert('当前无笔记信息可供复制~')
        }
    }
    return <div>
        {
            !data.name ?
                <InputView setFileTxt={setFileTxt} />
                : <div>
                    <Header filename={data.name}
                        handleCopy={handleCopy}
                        handleClear={handleClear} />
                    <MarkList marks={marks} />
                </div>
        }
    </div>
}