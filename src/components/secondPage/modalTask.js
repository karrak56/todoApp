import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tasksFetched, modalNewTask } from '../../action/action'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import 'react-calendar/dist/Calendar.css';
import './secondPage.css'

const ModalTask = () => {

    const moment = require('moment')
    const dateCreateTask = moment().format('YYYY-MM-DD')

    const project = useSelector(store => store.currentProject)
    const modal = useSelector(store => store.modalNewTask)

    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [miniTask, setMiniTask] = useState('');
    const [miniTaskModal, setMiniTaskModal] = useState(false)
    const dispatch = useDispatch()
    const buttonRef = useRef()
    const [button, setButton] = useState(true)
    const [buttonAdd, setButtonAdd] = useState(true) 
    const [deadline, setDeadline] = useState(dateCreateTask)

    const addNewTask = async (e) => {
        
        const obj = JSON.parse(localStorage.getItem(project))
        const id = Math.floor(Math.random() * (1000 - 1) + 1)

        const newTask = {
            id,
            "name": taskName,
            "descr": taskDesc,
            "create": dateCreateTask,
            "deadline": deadline,
            "miniTask": miniTask
        }

        obj.tasks[0].push(newTask)
        localStorage.setItem(project, JSON.stringify(obj))

        dispatch(tasksFetched(id))     
    }

    const addNewMiniTask = () => {     
        setMiniTaskModal(!false)
        setButton(!true)  
    }

    const buttonDisable = arg => arg.length !== 0 ? setButtonAdd(false) : setButtonAdd(true)
    
    return(
        <div id="miniTask">
            <div onClick={() => dispatch(modalNewTask(false))} className={`${modal ? 'modal active' : 'modal'} 
                flex items-center justify-center fixed top-0 left-0 h-screen w-screen`}>
            <span className='flex flex-col justify-center items-center sm:w-105 w-5/6 h-full'>
                <AiOutlineCloseCircle onClick={() => dispatch(modalNewTask(false))} color='grey' className='w-8 h-8 relative top-0 left-1/2 cursor-pointer'/> 
                <div onClick={(e) => e.stopPropagation()} className="rounded-2xl p-12 bg-white w-full sm:w-96 overflow-hidden flex flex-col justify-center items-center">
                    <p className='sm:text-5xl text-3xl font-bold mb-8'>Новое задание</p>
                    <input onChange={(e) => {setTaskName(e.target.value); buttonDisable(e.target.value)}} value={taskName} type="text" placeholder='Придумай заголовок' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-2 outline-0" />
                    <textarea maxLength={200} onChange={(e) => setTaskDesc(e.target.value)} value={taskDesc} type='text' placeholder='Описание' className='bg-gray-50 border-0 border-gray-100 text-gray-800 block w-full h-2/6 p-2.5  scrollbar-thin scrollbar-thumb-gray-100 scrollbar-thumb-rounded-md text-sm rounded-lg mb-2 outline-0 overflow-hidden resize-none pb-10'/>

                    <p className='text-base font-bold'>Когда дедлайн?</p>
                    <input onChange={(e) => setDeadline(e.target.value)} type="date" name="trip-start" min={dateCreateTask} alt='Дата дедлайна' max="2025-12-31" className='mb-2 w-full h-20 outline-0 bg-gray-50 border-0 text-gray-800 px-4 text-xs rounded-lg'/>

                    {button ? (<button onClick={() => addNewMiniTask()} className="duration-150 text-blue-700 bg-blue-100 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center">Добавить подзадачу</button>) : null}
                    <MiniTasks setMiniTask={setMiniTask} miniTask={miniTask} setMiniTaskModal={setMiniTaskModal} miniTaskModal={miniTaskModal}/>
                    {/* <LoadFile/> */}
                    <button disabled={buttonAdd} ref={buttonRef} id="miniTaskButton" onClick={() => {addNewTask(); dispatch(modalNewTask(false)); setTaskName(''); setTaskDesc(''); setMiniTask('')}} type="submit" className=" mt-4 duration-300 text-white bg-blue-500  disabled:bg-zinc-50 disabled:text-zinc-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center">{buttonAdd ? 'Нет заголовка!' : 'Добавить задание'}</button>
                </div>
            </span>
            </div>
        </div>
    )
}

const MiniTasks = ({setMiniTask, miniTask, miniTaskModal}) => {

    const content = miniTaskModal ? (<div className='w-full h-fit'>
        <input onChange={(e) => setMiniTask(e.target.value)} value={miniTask} type="text" placeholder='Опишите подзадачу' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-4 outline-0" />
        </div>) : null

    return content 
}

// const LoadFile = () => {

//     const [drag, setDrag] = useState(false)
//     const project = useSelector(store => store.currentProject)

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

export default ModalTask
