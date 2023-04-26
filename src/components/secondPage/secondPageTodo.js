import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react"
import { editTask, modalEditTask, taskDeleted, modalNewTask, modalDeleteTask, currentTasksArray } from '../../action/action';
import { MdCloudDone, MdModeEditOutline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaFireAlt } from 'react-icons/fa'

import 'animate.css';

const SecondPageTodo = () => {

    const project = useSelector(store => store.currentProject)
    const searchItem = useSelector(store => store.search)
    const currentTasksArray = useSelector(store => store.currentTasksArray)
    const random = useSelector(store => store.tasks)
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(project)).tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        setTasks(currentTasksArray)
    },[currentTasksArray])

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem(project)).tasks)   
    }, [random, project])

    const visibleTasks = tasks.map(arr => arr.filter(item => item.name.toUpperCase().includes(searchItem.toUpperCase())))

    const drop = <div className="flex flex-col justify-center items-center h-screen w-full rounded-xl animate__animated animate__zoomInDown bg-zinc-50">   
            <p className='font-light text-center text-zinc-300'>Здесь пока пусто...</p>
        </div>
    const noneTasks = <div className="flex flex-col justify-center items-center h-screen w-full px-6 rounded-xl bg-zinc-50 ">
        <div className='flex flex-col justify-center items-center animate__animated animate__zoomInDown'>
            <p className='font-bold text-center text-3xl'>Пока что задач нет...</p>
            <p className=' mt-2 font-light text-center text-md'>Добавляй и редактируй их. Не забывай перетаскивать <br/>выполненные задания в следующие колонки</p>
            <button onClick={() => dispatch(modalNewTask(true))} className='px-5 py-2 mt-6 rounded-md bg-blue-500 hover:bg-blue-400 duration-150 '>
                <p className='text-center text-white font-medium text-2xl'>Добавить первую</p>
            </button>
        </div>
    </div>

    return(
        <div className="w-full h-full flex flex-col xl:flex-row xl:items-baseline items-center xl:justify-between pt-20 sm:pt-0">
            {(tasks[0].length === 0 && tasks[1].length === 0 && tasks[2].length === 0) ? noneTasks : tasks.map((columns, i) => {
                return (
                    <div key={i} className="h-full xl:w-1/3 w-full rounded-xl xl-mb-0 mb-20">
                        <p className="font-bold text-5xl text-center mb-6">
                            {i === 0 ? 'Очередь': null}
                            {i === 1 ? 'Разработка' : null}
                            {i === 2 ? 'Завершены' : null}
                        </p>
                        <div className={`w-full ${columns.length === 0 ? 'h-5/6' : 'h-min'} rounded-xl px-4 flex flex-col items-center`}>
                            {columns.length === 0 ? drop : visibleTasks[i].map((task, i) => { 
                                return (<Tasks
                                    key={i}
                                    id={task.id} 
                                    data={task}
                                />)
                            })}
                        </div>
                    </div>
                )
            })}     
        </div>
    )
}


const Tasks = ({data, id}) => {

    const project = useSelector(store => store.currentProject)
    const dispatch = useDispatch()

    const moment = require('moment') 
    const currentDate = moment().format('YYYY-MM-DD')
    const start = moment(`${data.create}`, "YYYY-MM-DD");
    const end = moment(`${currentDate}`, "YYYY-MM-DD");  
    const inWork = moment.duration(end.diff(start)).asDays();
    const deadline = moment(`${data.deadline}`, "YYYY-MM-DD");  
    const deadlineAnimation = moment.duration(deadline.diff(end)).asDays();
    
    const visibleMiniTask = data.miniTask ? (<>
        <p className="text-lg font-bold pt-2 border-t-2 border-gray-200">Минитаск</p>
        <p className="text-xs font-normal mb-2">{data.miniTask}</p>
    </>) : null

    const editing = () => {

        dispatch(modalEditTask(true))

        const projs = JSON.parse(localStorage.getItem(project))
        const taskArr = projs.tasks.map(arr => arr.filter(task => task.id === data.id)).flat()
        const task = taskArr.find(item => item.id === data.id)

        dispatch(editTask(task))   
    }

    const goTask = () => {
        const projs = JSON.parse(localStorage.getItem(project))
        const newArr = projs.tasks.map(arr => arr.filter(task => task.id !== data.id))
        const taskArr = projs.tasks.map(arr => arr.filter(task => task.id === data.id)).flat() 
        const task = taskArr.find(item => item.id === data.id)
    
        if(projs.tasks[1].find(item => item.id === task.id)) {
            newArr[2].push(task)
        } else if (projs.tasks[0].find(item => item.id === task.id)) {
            newArr[1].push(task)
        } else {
            newArr[2].push(task)
        }
        // projs.tasks[1].find(item => item.id === task.id) ? newArr[2].push(task) : newArr[1].push(task)

        projs.tasks = newArr
        dispatch(currentTasksArray(projs.tasks)) 
        localStorage.setItem(project, JSON.stringify(projs))
    }

    const dataText = (value) => {

        value = Math.abs(value) % 100; 
        const num = value % 10;
        if(value > 10 && value < 20) return "дней"; 
        if(num > 1 && num < 5) return "дня";
        if(num === 1) return "день"; 
        return "дней";
    }

    return( 
        <div key={id} className={`w-full h-fit ${deadlineAnimation < 5 ? `shine` : `bg-zinc-50`} bg-zinc-50 rounded-xl mb-2 py-4 px-6 animate__animated animate__headShake overflow-hidden`}>
            <div className={`${deadlineAnimation < 5 ? `block` : `hidden`} my-4 flex items-center`}>
                <FaFireAlt color="blue" className='w-5 h-5'/>
                <p className='text-blue-500 ml-2'>СКОРО ДЕДЛАЙН</p> 
            </div>
               
            <div className="flex flex-col justify-between items-start">
                <p className="font-bold text-2xl mb-2 animate__animated animate__bounceInDown w-64">{data.name}</p>
                <p className="w-fit text-xs font-normal text-black mb-2">в работе <b>{inWork} {dataText(inWork)}</b></p>
            </div>
            <p className="text-xs xl:mt-0 mt-2 font-normal mb-2">{data.descr}</p>

           {visibleMiniTask}
           
            <div className='flex sm:flex-row flex-col mt-4 mb-4'>
                <button onClick={() => editing()} className='sm:mb-0 mb-2 sm:mr-2 mr-0 w-30 h-10 flex flex-row justify-start sm:justify-center items-center text-xs rounded-lg text-red-700 py-4 px-4 font-bold'>
                    <MdModeEditOutline color='blue' className='w-5 h-5'/>
                    <p className='ml-2 text-xs text-blue-700 font-bold'>Редактировать</p>
                </button> 
                <button onClick={(e) => {e.preventDefault(); dispatch(modalDeleteTask(true)); dispatch(taskDeleted(data.id))}} className='w-30 h-10 flex flex-row justify-start sm:justify-center items-center text-xs rounded-lg text-red-700 py-4 px-4 font-bold'>
                    <AiTwotoneDelete color='blue' className='w-5 h-5'/>
                    <p className='ml-2 text-xs text-blue-700 font-bold'>Удалить</p>
                </button>            
            </div>

            <div className='flex sm:flex-row flex-col justify-between'>
                <p className="text-xs font-normal text-black">Создано <b>{data.create}</b></p>
                <p className="text-xs font-normal text-black"> <b>{deadlineAnimation < 0 ? "Сгорел" : `Дедлайн ${data.deadline}`}</b></p>             
            </div> 

            <button onClick={() => goTask()} className='mt-4 flex flex-row items-center justify-center bg-none w-full h-10 rounded-lg bg-blue-600 py-4 px-4'>
                <MdCloudDone color='white' className='w-6 h-8'/>
                <p className='ml-2 text-xs font-bold text-white'>Готово</p>          
            </button>
            
         </div>
    )
}

export default SecondPageTodo
