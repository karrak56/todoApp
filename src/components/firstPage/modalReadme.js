import { useState, useEffect } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Cat from './cat.gif'
import './firstPage.css'

const ModalReadme = () => {

    const [modal, setModal] = useState(false)                         

    useEffect(() => {
        if(sessionStorage.getItem("readme") === null) {
            setModal(true) 
            sessionStorage.setItem("readme", false)
            setTimeout(() => { 
                setModal(false)  
            }, 10000) 
        } 
    }, [])

    return(
        <div>
            <div onClick={() => setModal(false)} className={`${modal ? 'modal active' : 'modal'} flex items-center justify-center fixed top-0 left-0 h-screen w-screen`}>
            
                <span className='flex flex-col justify-center items-center  sm:w-105 w-5/6 h-full'>
                    <AiOutlineCloseCircle onClick={() => setModal(false)} color='grey' className='w-8 h-8 relative top-0 left-1/2 cursor-pointer'/> 
                    <div onClick={(e) => e.stopPropagation()} className="rounded-2xl p-12 bg-white sm:w-96 flex flex-col justify-center items-center">  
                        <img src={Cat} alt="" />
                        <p className='text-5xl font-bold mb-8'>Readme</p>
                        <p className='text-base font-light mb-8'>Todo приложение позволяет создавать, редактировать и удалять задания, а также продвигать их по мере прогресса. Задания подсказывают приближение Дедлайна и сгорают в случае его провала.</p>
                       
                    </div>
                </span>
            </div>
        </div>
    )
}

export default ModalReadme