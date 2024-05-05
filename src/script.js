const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let edges = [];

function createNodes(count) {
    nodes = []; // Reset nodes
    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 10
        });
    }
}

function connectNodes() {
    edges = []; // Reset edges
    // Simple connection logic, could be improved
    for (let i = 0; i < nodes.length; i++) {
        if (i < nodes.length - 1) {
            edges.push({ from: i, to: i + 1 });
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fill();
    });
    edges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(nodes[edge.from].x, nodes[edge.from].y);
        ctx.lineTo(nodes[edge.to].x, nodes[edge.to].y);
        ctx.stroke();
    });
}

document.getElementById('generate').addEventListener('click', function() {
    const count = parseInt(document.getElementById('nodeCount').value);
    createNodes(count);
    connectNodes();
    draw();
});
