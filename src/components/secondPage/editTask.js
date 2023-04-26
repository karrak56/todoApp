import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tasksFetched, modalEditTask } from '../../action/action';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './secondPage.css'

const EditTask = () => {

    const moment = require('moment')
    const currentDate = moment().format('YYYY-MM-DD')

    const modal = useSelector(store => store.modalEditTask)
    const project = useSelector(store => store.currentProject)
    const task = useSelector(store => store.editTask)
    const {id} = task

    const [taskName, setTaskName] = useState(task.name)
    const [taskDesc, setTaskDesc] = useState(task.descr)
    const [miniTask, setMiniTask] = useState(task.miniTask);
    const [miniTaskModal, setMiniTaskModal] = useState(false)
    const [deadline, setDeadline] = useState(task.deadline) 
    const dispatch = useDispatch()
    const buttonRef = useRef()
    const [button, setButton] = useState(true)

    

    useEffect(() => {
        setTaskName(task.name)  
        setTaskDesc(task.descr)
        setDeadline(task.deadline)
    },[task])

    const editTask = async () => {
        
        const obj = JSON.parse(localStorage.getItem(project))

        // const allArrNum = obj.tasks.map(arr => arr.findIndex(element => element.id === id))
        // const num = +(allArrNum.filter(item => item >= 0).join())
        
        const editTask = {
            id,
            "name": taskName,
            "descr": taskDesc,
            "create": task.create,
            "deadline": deadline,
            "miniTask": miniTask
        }

        const custom = obj.tasks[0].map(item => item.id === id ? editTask : item)
        obj.tasks[0] = custom
        localStorage.setItem(project, JSON.stringify(obj))

        const random = Math.floor(Math.random() * (1000 - 1) + 1)
        dispatch(tasksFetched(random))
 
    }

    const addNewMiniTask = () => {     
        setMiniTaskModal(true)
        setButton(false)  
    }
    
    return(
        <div id="miniTask">
            <div onClick={() => {dispatch(modalEditTask(false)); setTaskName(''); setTaskDesc(''); setMiniTask('')}} className={`${modal ? 'modal active' : 'modal'} 
                flex items-center justify-center fixed top-0 left-0 h-screen w-screen`}>
            <span className='flex flex-col justify-center items-center sm:w-105 w-5/6 h-full'>
                <AiOutlineCloseCircle onClick={() => dispatch(modalEditTask(false))} color='grey' className='w-8 h-8 relative top-0 left-1/2 cursor-pointer'/> 
                <div onClick={(e) => e.stopPropagation()} className="rounded-2xl p-12 bg-white sm:w-96 w-full overflow-hidden flex flex-col justify-center items-center">
                    <p className='sm:text-5xl text-3xl font-bold mb-8'>Изменить задание</p>
                    <input onChange={(e) => setTaskName(e.target.value)} value={taskName} type="text" placeholder='Придумай заголовок' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-2 outline-0" />
                    <textarea maxLength={200} onChange={(e) => setTaskDesc(e.target.value)} value={taskDesc} type='text' placeholder='Описание' className='scrollbar-thin scrollbar-thumb-gray-100 scrollbar-thumb-rounded-md bg-gray-50 border-0 border-gray-100 text-gray-800 block w-full h-2/6 p-2.5  text-sm rounded-lg mb-2 outline-0 overflow-auto resize-none pb-10'/>
                    <p className='text-base font-bold'>Когда дедлайн?</p>
                    <input onChange={(e) => setDeadline(e.target.value)} value={deadline} type="date" name="trip-start" min={currentDate} max="2025-12-31" className='mb-2 w-full h-20 outline-0 bg-gray-50 border-0 text-gray-800 px-4 text-xs rounded-lg'/>

                    {button ? (<button onClick={() => addNewMiniTask()} className="duration-150 text-blue-700 bg-blue-100 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Добавить подзадачу</button>) : null}
                    <MiniTasks setMiniTask={setMiniTask} setMiniTaskModal={setMiniTaskModal} miniTaskModal={miniTaskModal}/>
                    {/* <LoadFile/> */}
                    <button ref={buttonRef} id="miniTaskButton" onClick={() => {editTask(); dispatch(modalEditTask(false)); setTaskName(''); setTaskDesc(''); setMiniTask('')}} type="submit" className="mt-2 duration-150 text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center">Сохранить</button>
                </div>
            </span>
            </div>
        </div>
    )
}

const MiniTasks = ({setMiniTask, miniTaskModal}) => {

    const [nameMiniTask, setNameMiniTask] = useState()

    useEffect(() => {
        setMiniTask(nameMiniTask)
    },[nameMiniTask])

    const content = miniTaskModal ? (<div className='w-full h-fit'>
        <input onChange={(e) => setNameMiniTask(e.target.value)} value={nameMiniTask} type="text" placeholder='Опишите подзадачу' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg block w-full p-2.5 outline-0" />
        </div>) : null

    return content 
}

// const LoadFile = () => {

//     const [drag, setDrag] = useState(false)

//     function dragStartHandler(e) {
//         e.preventDefault()
//         setDrag(true)
//     }

//     function dragLeaveHandler(e) {
//         e.preventDefault()
//         setDrag(false)
//     }

//     function onDropHandler(e) {
//         e.preventDefault()
//         let files = [...e.dataTransfer.files]
//         const formdata = new FormData()
//         formdata.append('file', ...files.map(file => file))

//         setDrag(false)
//     }


//     const area = drag ? (<div onDragStart={(e) => dragStartHandler(e)} onDragLeave={(e) => dragLeaveHandler(e)} onDragOver={(e) => dragStartHandler(e)} onDrop={(e) => onDropHandler(e)} className='w-full h-20 border-2 border-dotted rounded-lg text-black border-white bg-blue-100 flex justify-center items-center text-xs my-4 px-6 text-center'>Отпустите, чтобы загрузить их</div>) : 
//     (<div onDragStart={(e) => dragStartHandler(e)} onDragLeave={(e) => dragLeaveHandler(e)} onDragOver={(e) => dragStartHandler(e)} className='w-full h-20 border-2 border-dotted rounded-lg text-black border-white bg-blue-100  flex justify-center items-center text-xs my-4 px-6 text-center'>Добавить файлы</div>);

//     return area
     
// }

export default EditTask
