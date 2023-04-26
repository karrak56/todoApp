import { useState } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './firstPage.css'

const ModalFirstPage = ({modal, setModal}) => {

    const [projectName, setProjectName] = useState('')
    const [projectDesc, setProjectDesc] = useState('')
    const [button, setButton] = useState(true)                         

    const addNewProject = async () => {
        const id = Math.floor(Math.random() * (10 - 1) + 1)
        const project = {
            id,
            projectName,
            projectDesc,
            "tasks": [[],[],[]]
        }
        localStorage.setItem(`${id}`, JSON.stringify(project))   
    }

    const buttonDisable = arg => arg.length !== 0 ? setButton(false) : setButton(true)

    return(
        <div>
            <div onClick={() => setModal(false)} className={`${modal ? 'modal active' : 'modal'} flex items-center justify-center fixed top-0 left-0 h-screen w-screen`}>
            
                <span className='flex flex-col justify-center items-center  sm:w-105 w-5/6 h-full'>
                    <AiOutlineCloseCircle onClick={() => setModal(false)} color='grey' className='w-8 h-8 relative top-0 left-1/2 cursor-pointer'/> 
                    <form onClick={(e) => e.stopPropagation()} className="rounded-2xl p-12 bg-white sm:w-96 flex flex-col justify-center items-center">  
                        <p className='text-5xl font-bold mb-8'>Новый проект</p>
                        <input onChange={(e) => {setProjectName(e.target.value); buttonDisable(e.target.value)}} value={projectName} type="text" placeholder='Как назовём?' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-4 outline-0 required:border-red-400" />
                        <textarea maxLength={100} onChange={(e) => {setProjectDesc(e.target.value)}} value={projectDesc} type='text' placeholder='Комментарий...' className='bg-gray-50 border-0 border-gray-100 text-gray-800 block w-full h-30 overflow-hidden resize-none p-2.5 pb-10 whitespace-pre-wrap text-sm rounded-lg mb-16 outline-0'/>
                        <button disabled={button} onClick={(e) => {e.preventDefault(); addNewProject(); setModal(false); setProjectName(''); setProjectDesc('')}} type="submit" className="duration-300 text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center disabled:bg-zinc-50 disabled:text-zinc-500">Создать проект</button>
                    </form>
                </span>
            </div>
        </div>
    )
}

export default ModalFirstPage