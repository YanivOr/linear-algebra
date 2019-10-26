const newVector = (x, y) => {
    const vectorName = `v${vectorCounter}`;
    vectors[vectorName] = new Vector(x, y, vectorName);
    vectorCounter++;
}

const vectorCreate = (command) => {
    const [x, y] = command.split(',');
    newVector(x, y);
}

const vectorDelete = (command) => {
    const vectorName = command;
    delete vectors[vectorName];
}

const vectorsAddition = (command) => {
    const [v0, v1] = command.split(',');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) + parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) + parseInt(vectors[v1].y);

    newVector(x, y);
}

const vectorsSubtraction = (command) => {
    const [v0, v1] = command.split(',');

    if (!vectors[v0] || !vectors[v1]) {
        return;
    }

    const x = parseInt(vectors[v0].x) - parseInt(vectors[v1].x);
    const y = parseInt(vectors[v0].y) - parseInt(vectors[v1].y);

    newVector(x, y);
}

const vectorsScaling = (command) => {
    const [v0, scalar] = command.split(',');

    if (!vectors[v0]) {
        return;
    }

    vectors[v0].x *= scalar;
    vectors[v0].y *= scalar;
}

/*************************************************/

/*
const commonPatterns = {
    vn: `(v)([0-9]+)`
};
*/

const patterns = [
    {
        // Create vector
        pattern: new RegExp(`(v+)(\\s*)(\\()(\\s*)(-*)([0-9]+)(.*)([0-9]*)(\\s*)(,)(\\s*)(-*)([0-9]+)(.*)([0-9]*)(\\s*)(\\))`),
        remove: [
            new RegExp(`(\\s)`, 'g'), 
            new RegExp(`(v+)(\\s*)(\\()`),
            new RegExp(`(\\))`)
        ],
        handleFunction: vectorCreate
    },
    {
        // Delete vector
        pattern: new RegExp(`(del)(\\s+)(v)([0-9]+)`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(del)`)
        ],
        handleFunction: vectorDelete
    },
    {
        // Vectors addition
        pattern: new RegExp(`(add)(\\s*)(\\()(\\s*)(v)([0-9]+)(\\s*)(,)(\\s*)(v)([0-9]+)(\\s*)(\\))`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(add)(\\()`),
            new RegExp(`(\\))`)
        ],
        handleFunction: vectorsAddition
    },
    {
        // Vectors subtraction
        pattern: new RegExp(`(sub)(\\s*)(\\()(\\s*)(v)([0-9]+)(\\s*)(,)(\\s*)(v)([0-9]+)(\\s*)(\\))`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(sub)(\\()`),
            new RegExp(`(\\))`)
        ],
        handleFunction: vectorsSubtraction
    },
    {
        // Vector scaling
        pattern: new RegExp(`(scale)(\\s*)(\\()(\\s*)(v)([0-9]+)(\\s*)(,)(\\s*)(-*)([0-9]+)(.*)([0-9]*)(\\s*)(\\))`),
        remove: [
            new RegExp(`(\\s)`, 'g'),
            new RegExp(`(scale)(\\()`),
            new RegExp(`(\\))`)
        ],
        handleFunction: vectorsScaling
    }
];

const removeStrings = (command, remove) =>{
    remove.map(pattern => {
        command = command.replace(pattern, '');
    });

    return command;
}

const handleCommand = (command) => {
    command = command.trim();

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
    commands = [
        'v(3,5)',
        'v(-5,2)',
        'add(v0,v1)',
        'sub(v0,v1)',
        'scale(v0,-2)',
    ].map(command => {
        handleCommand(command);
    });
})
