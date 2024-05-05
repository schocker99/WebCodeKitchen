const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let edges = [];
const nodeRadius = 10; // Radius of each node
const boundingRadiusMultiplier = 2;

function createNodes(count) {
    nodes = [];
    for (let i = 0; i < count; i++) {
        nodes.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: Math.random() * (canvas.height - 40) + 20,
            radius: nodeRadius,
            boundingRadius: nodeRadius * boundingRadiusMultiplier
        });
    }
}

function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        // Draw the node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Draw the bounding circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.boundingRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();

        // Draw the edge
        edges.forEach(edge => {
            ctx.beginPath();
            ctx.moveTo(nodes[edge.from].x, nodes[edge.from].y);
            ctx.lineTo(nodes[edge.to].x, nodes[edge.to].y);
            ctx.strokeStyle = 'black'
            ctx.stroke();
        });
    });
}

function adjustNodePositions() {
    let isOverlapping = false;
    do {
        console.log("adjusting")
        isOverlapping = false;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = nodeA.boundingRadius + nodeB.boundingRadius;
                if (distance < minDistance) {
                    isOverlapping = true;
                    const overlap = minDistance - distance;
                    const adjustX = (overlap * (dx / distance)) / 2;
                    const adjustY = (overlap * (dy / distance)) / 2;

                    nodeA.x -= adjustX;
                    nodeA.y -= adjustY;
                    nodeB.x += adjustX;
                    nodeB.y += adjustY;

                    // Keep nodes within canvas bounds
                    nodeA.x = Math.max(nodeA.boundingRadius, Math.min(canvas.width - nodeA.boundingRadius, nodeA.x));
                    nodeA.y = Math.max(nodeA.boundingRadius, Math.min(canvas.height - nodeA.boundingRadius, nodeA.y));
                    nodeB.x = Math.max(nodeB.boundingRadius, Math.min(canvas.width - nodeB.boundingRadius, nodeB.x));
                    nodeB.y = Math.max(nodeB.boundingRadius, Math.min(canvas.height - nodeB.boundingRadius, nodeB.y));
                }
            }
        }
    } while (isOverlapping);

    drawNodes();
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

document.getElementById('generate').addEventListener('click', function() {
    const count = parseInt(document.getElementById('nodeCount').value);
    createNodes(count);
    connectNodes();
    drawNodes();
    adjustNodePositions();
});
