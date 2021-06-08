import randomID from './randomID'

const defaultData = [
    {
        name: 'Todo',
        tasks: [
            {
                id: randomID(),
                name: 'pilates',
                description: 'for 30min'
            },
            {
                id: randomID(),
                name: 'cardio',
                description: 'for 30min'
            }
        ],
    },
    {
        name: 'In Progress',
        tasks: [
            {
                id: randomID(),
                name: 'trello clone',
                description: 'for class'
            },
            {
                id: randomID(),
                name: 'composition API',
                description: 'for class'
            }
        ],
    },
    {
        name: 'Done',
        tasks: [
            {
                id: randomID(),
                name: 'make pasta',
                description: 'meal'
            }
        ],
    }
]

export default defaultData