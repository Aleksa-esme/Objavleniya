const rootNode = document.querySelector('.root'); //HTMLDivElement
const rootNode1 = document.getElementsByClassName('root'); //HTMLCollection

let renderWaterfall = (rootNode, columnCount, elementGap) => {
    if (columnCount >= 1) {
        const nodeWidth = rootNode.offsetWidth;
        const columnWidth = (nodeWidth - elementGap * (columnCount - 1)) / columnCount + 'px'; // ширина колонки с учетом margin-right
        const childrenArray = Array.from(rootNode.children); //массив первоначальных блоков-потомков
        
        rootNode.innerHTML = '<div></div>';
        const nodeContainer = rootNode.firstChild;
        
        for (let i = 0; i < columnCount; i++) {
            nodeContainer.innerHTML += `<div id="${i}" style="width: ${columnWidth}"></div>`;
        }
        
        const columnArray = Array.from(nodeContainer.children); //массив колонок-потомков
        
        childrenArray.map(child => {
            let minColumn = columnArray.sort((a,b) => a.offsetHeight - b.offsetHeight)[0];
            minColumn.innerHTML += child.outerHTML;
        })
        
        nodeContainer.style.display = 'flex';
        const columnNode = nodeContainer.childNodes;

        for (let i = 0; i < columnCount - 1; i++) {
            columnNode[i].style['margin-right'] = `${elementGap}px`;
        }

        for (let i = 0; i < columnCount; i++) {
            for (let k = 0; k < columnNode[i].children.length - 1; k++) {
                columnNode[i].children[k].style['margin-bottom'] = `${elementGap}px`;
            }
        }
    } else {
        return rootNode;
    }
    
    
}

renderWaterfall(rootNode, 3, 10);
