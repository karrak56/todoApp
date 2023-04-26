export const projectFetching = () => {
    return {
        type: 'PROJECT_FETCHING'
    }
}

export const projectFetched = (action) => {
    return {
        type: 'PROJECT_FETCHED',
        payload: action
    }
}

export const currentProject = (action) => {
    return {
        type: 'CURRENTPROJECT_FETCHED',
        payload: action
    }
}

export const tasksFetched = (action) => {
    return {
        type: 'TASKS_FETCHED',
        payload: action
    }
}

export const searchInput = (action) => {
    return {
        type: 'SEARCH',
        payload: action
    }
}

export const editTask = (action) => {
    return {
        type: 'EDIT_TASK',
        payload: action
    }
}

export const taskDeleted = (action) => {
    return {
        type: 'TASK_ID_DELETED',
        payload: action
    }
}

export const currentTasksArray = (action) => {
    return {
        type: 'CURRRENT_TASKS_ARRAY',
        payload: action
    }
}

export const modalNewTask = (action) => {
    return {
        type: 'MODAL_NEW_TASK',
        payload: action
    }
}

export const modalEditTask = (action) => {
    return {
        type: 'MODAL_EDIT_TASK',
        payload: action
    }
}

export const modalDeleteTask = (action) => {
    return {
        type: 'MODAL_DELETE_TASK',
        payload: action
    }
}

