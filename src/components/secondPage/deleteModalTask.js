import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { currentTasksArray, modalDeleteTask } from '../../action/action'
import './secondPage.css'

const DeleteModalTask = () => {

    const project = useSelector(store => store.currentProject)
    const taskIdDelete = useSelector(store => store.taskIdDelete)
    const modal = useSelector(store => store.modalDeleteTask)
    const dispatch = useDispatch()

    const deleteTask = () => {
        const projs = JSON.parse(localStorage.getItem(project))
        const newArr = projs.tasks.map(arr => arr.filter(task => task.id !== taskIdDelete))
        projs.tasks = newArr

        localStorage.setItem(project, JSON.stringify(projs))
        dispatch(currentTasksArray(projs.tasks))    
    }

    return(
        <div id="modaltask">
            <div onClick={() => dispatch(modalDeleteTask(false))} className={`${modal ? 'modal active' : 'modal'} 
                flex items-center justify-center fixed top-0 left-0 h-screen w-screen`}>
                <span className='flex flex-col justify-center items-center sm:w-105 w-5/6 h-full'>
                    <AiOutlineCloseCircle onClick={() => dispatch(modalDeleteTask(false))} color='grey' className='w-8 h-8 relative top-0 left-1/2 cursor-pointer'/> 
                    <div onClick={(e) => e.stopPropagation()} className="rounded-2xl p-12 bg-white w-full sm:w-96 overflow-hidden flex flex-col justify-center items-center">
                        <p className='font-bold text-2xl'>Удалить это задание?</p>
                        <p className='font-light text-sm mb-4'>Мы не сможем его востановить более..</p>
                        <div className='flex flex-row '>
                            <button onClick={() => {deleteTask(); dispatch(modalDeleteTask(false))}} className='px-4 py-2 bg-red-500 text-white text-lg rounded-lg mr-2'>Удалить?</button>
                            <button onClick={() => dispatch(modalDeleteTask(false))} className='px-4 py-2 bg-zinc-100 text-black text-lg rounded-lg'>Оставить</button>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default DeleteModalTask