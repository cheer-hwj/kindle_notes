// 处理得到的html字符串
export default function handleContent(content: string, isCN: Boolean) {
    let result: object[] = [];
    if (content) {
        const sectionReg = /<div class="sectionHeading">\n(.+)\n<\/div>/gi;
        const sections = [...content.matchAll(sectionReg)];
        const contentIndex: number[] = []; // 获得片段内容索引
        const sectionlines = sections.map((val) => {
            if (Array.isArray(val) && val[0] && val[1]) {
                contentIndex.push(val.index || 0);
                return val[1].trim();
            }
            return val;
        });

        result = sectionlines.map((val, index) => {
            const chapterName = val; // 每一章的标题内容

            const startIndex = contentIndex[index];
            const endIndex = contentIndex[index + 1];
            const chapterStr = content.slice(startIndex, endIndex); // 获得每一章的字符串内容

            const heading = /<div class="noteHeading">\n(.+)\n<\/div>/gi;
            const headIndex = [...chapterStr.matchAll(heading)].map((head) => head.index || 0); // 获得每一条标注的索引

            const markLines = headIndex.map((el, elIndex) => {
                const startIndex = headIndex[elIndex];
                const endIndex = headIndex[elIndex + 1];
                const marks = chapterStr.slice(startIndex, endIndex);

                const headReg = marks.match(/<div class="noteHeading">\n(.+)\n<\/div>/i);
                const headContent = headReg && headReg[1].trim();
                let isMarking = true;
                let pageNum = '';
                if (headContent) {
                    if (headContent.indexOf('笔记') > -1) {
                        isMarking = false; // 获取标注类型
                    }
                    const posMatch = headContent.match(/- 第 ([0-9]+) 页·位置/i);
                    if (posMatch && posMatch[1]) {
                        pageNum = posMatch[1]; //获取标注位置
                    }
                }
                const markReg = marks.match(/<div class="noteText">\n(.+)\n<\/div>/i);
                const markContent = markReg && markReg[1].trim() || ''; // 获取标注内容
                return {
                    pageNum, // 标注的页码
                    isMarking, // 是否为标记（或是笔记）
                    markContent, // 标记的内容
                }
            });
            return {
                chapterName, // 章节名称
                markLines, // 标注内容
            }
        })
    }
    return result;
}