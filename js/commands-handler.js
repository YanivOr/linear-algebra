const newVector = (x, y, vectorName = null) => {
    const name = vectorName;
    vectors[name] = new Vector(x, y, name);
}

/***************************************/

const vectorCreate = (command) =>{
    let [vectorName, values] = command.split('=');

    vectorName = vectorName.replace(new RegExp(`(\\s)`, 'g'), '');

    values = values.trim();
    values = values.replace(new RegExp(`(\\s)+`, 'g'), ' ');
    values = values.replace(new RegExp(`(\\[)(\\s)*`, 'g'), '');
    values = values.replace(new RegExp(`(\\s)*(\\])`, 'g'), '');

    const [x, y] = values.split(' ');
    newVector(x, y, vectorName);
}

const vectorDelete = (command) => {
    const vectorName = command;
    delete vectors[vectorName];
}

const vectorsAddition = (command) => {
    let [vectorName, expression] = command.split('=');

    vectorName = vectorName.replace(new RegExp(`(\\s)`, 'g'), '');
    const [v0, v1] = expression.split('+');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) + parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) + parseInt(vectors[v1].y);

    newVector(x, y, vectorName);
}

const vectorsSubtraction = (command) => {
    let [vectorName, expression] = command.split('=');

    vectorName = vectorName.replace(new RegExp(`(\\s)`, 'g'), '');
    const [v0, v1] = expression.split('-');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) - parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) - parseInt(vectors[v1].y);

    newVector(x, y, vectorName);
}


const vectorsMultiplication = (command) => {
    let [vectorName, expression] = command.split('=');

    vectorName = vectorName.replace(new RegExp(`(\\s)`, 'g'), '');
    const [v0, v1] = expression.split('.*');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) * parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) * parseInt(vectors[v1].y);

    newVector(x, y, vectorName);
}

const vectorsScalingNew = (command) => {
    let [vectorName, expression] = command.split('=');

    vectorName = vectorName.replace(new RegExp(`(\\s)`, 'g'), '');

    const [v0, scalar] = expression.split('*');

    if (!vectors[v0]) {
        return;
    }

    const x = parseInt(vectors[v0].x) * scalar;
    const y = parseInt(vectors[v0].y) * scalar;

    newVector(x, y, vectorName);
}

const vectorsScaling = (command) => {
    const [v0, scalar] = command.split('*');

    if (!vectors[v0]) {
        return;
    }

    vectors[v0].x *= scalar;
    vectors[v0].y *= scalar;
}

const dotProduct = (command) => {
    const [v0, v1] = command.split('*');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) * parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) * parseInt(vectors[v1].y);

    output.value += `${x+y}\n`;
}

const norm = (command) => {
    const v0 = command;

    if (!vectors[v0]) {
        return;
    }

    const x = parseInt(vectors[v0].x) * parseInt(vectors[v0].x);
    const y = parseInt(vectors[v0].y) * parseInt(vectors[v0].y);

    output.value += `${Math.sqrt(x+y)}\n`;
}


/*************************************************/

const patterns = [
    {
        // Create vector - example: v1 = [2 5]
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(=)(\\s*)(\\[)(\\s*)(-*)([0-9]+)(.*)([0-9]*)(\\s+)(-*)([0-9]+)(.*)([0-9]*)(\\s*)(\\])`),
        remove: [],
        handleFunction: vectorCreate
    },
    {
        // Delete vector - example: del v1
        pattern: new RegExp(`(del)(\\s+)([a-z]+)([a-z0-9]*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(del)`)
        ],
        handleFunction: vectorDelete
    },
    {
        // Vectors addition - example: v3 = v1 + v2
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(=)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\+)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
        ],
        handleFunction: vectorsAddition
    },
    {
        // Vectors subtraction - example: v3 = v1 - v2
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(=)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\-)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
        ],
        handleFunction: vectorsSubtraction
    },
    {
        // Vectors multiplication - example: v3 = v1 .* v2
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(=)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\.\\*)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
        ],
        handleFunction: vectorsMultiplication
    },
    {
        // Vectors scaling - new vector - example: v3 = v1 * 2
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(=)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\*)(\\s*)([0-9]+)(.*)([0-9]*)(\\s*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
        ],
        handleFunction: vectorsScalingNew
    },
    {
        // Vectors scaling - same vector - example: v1 * 2
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(\\*)(\\s*)([0-9]+)(.*)([0-9]*)(\\s*)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
        ],
        handleFunction: vectorsScaling
    },
    {
        // Dot product - example: v1 * v2 '
        pattern: new RegExp(`([a-z]+)([a-z0-9]*)(\\s*)(\\*)(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\')`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(\\')`, 'g'),
        ],
        handleFunction: dotProduct
    },
    {
        // Vector length. norm - example: norm(v1)
        pattern: new RegExp(`(norm)(\\s*)(\\()(\\s*)([a-z]+)([a-z0-9]*)(\\s*)(\\))`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(norm)(\\()`),
            new RegExp(`(\\))`),
        ],
        handleFunction: norm
    },
];

const removeStrings = (command, remove) =>{
    remove.map(pattern => {
        command = command.replace(pattern, '');
    });

    return command;
}

const handleCommand = (command) => {
    command = command.trim();
    output.value += `${command}\n`;

    patterns.map(({pattern, remove, handleFunction}) => {
        const results = pattern.test(command);
        if (results) {
            command = removeStrings(command, remove);
            handleFunction(command);
        }
    });
}

/**********************************************************/

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    /** /
    commands = [
        `v1 = [1 2]`,
        `v2 = [-2 3]`,
        `v3 = v1 + v2`,
        `v4 = v1 - v2`,
        `v5 = v1 * 0.5`,
        `v2 * 1.5`,
        `v1 * v2 '`,
        `v3 = v1 .* v2`,
        `norm(v3)`,
    ].map(command => {
        handleCommand(command);
    });
    /**/
})
