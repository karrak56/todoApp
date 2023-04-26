const initialState = {
    projects: [],
    currentProject: '',
    tasks: '',
    search: '',
    editTask: '',
    taskIdDelete: '',
    currentTasksArray: '',

    modalNewTask: false,
    modalEditTask: false,
    modalDeleteTask: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PROJECT_FETCHED':
            return {
                ...state,
                projects: action.payload
            }
        case 'CURRENTPROJECT_FETCHED':
            return {
                ...state,
                currentProject: action.payload
            }
        case 'TASKS_FETCHED':
            return {
                ...state,
                tasks: action.payload
            }
        case 'SEARCH':
            return {
                ...state,
                search: action.payload
            }
        case 'EDIT_TASK':
            return {
                ...state,
                editTask: action.payload
            }
        case 'TASK_ID_DELETED':
            return {
                ...state,
                taskIdDelete: action.payload
            }
        case 'CURRRENT_TASKS_ARRAY':
            return {
                ...state,
                currentTasksArray: action.payload
            }

        case 'MODAL_NEW_TASK':
            return {
                ...state,
                modalNewTask: action.payload
            }

        case 'MODAL_EDIT_TASK':
            return {
                ...state,
                modalEditTask: action.payload
            }

        case 'MODAL_DELETE_TASK':
            return {
                ...state,
                modalDeleteTask: action.payload
            }
        
        default:
            return {
                ...state,
            }

    }
}

export default reducer