export {}

const node = document.createElement("span");
node.id = 'wp-after-selection';
const childNode = document.createElement("span");
childNode.id = 'wp-after-selection-child'
node.appendChild(childNode)
node.style.position = "absolute";

let inputs = []
let x: number;
let y: number;

inputs.push(...document.querySelectorAll('[role=textbox]'))

for (let i of inputs) {
    /*    i.addEventListener('keydown', () => {
            console.log('input');
            console.log(i.innerText, 'CHANGE')
        })*/

    i.addEventListener('copy', (e) => {
        console.log('copy', document.getSelection().toString())
        //send to the extension
    })
}

document.addEventListener("selectionchange", ((e) => {
    const selected = document.getSelection()
    if (!selected.isCollapsed) {
        if (selected.toString().length > 9) {
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
        }
    }
}));

document.addEventListener("mouseup", ((e) => {
    console.log(e)
    if (e.target.nodeName !== 'PLASMO-CSUI') {
        const selected = document.getSelection()
        if (e.clientX < window.innerWidth / 2) {
            x = e.clientX;
        }
        y = e.clientY
        if (selected.isCollapsed) {
            const plasmo = node.getElementsByTagName('PLASMO-CSUI')
            for (let p of plasmo) {
                p.remove()
            }
            node.remove();
        } else {
            if (selected.toString().length > 9) {
                node.style.left = `${x}px`;
                node.style.top = `${y}px`;
                document.body.appendChild(node)
            }
        }
    }
}));