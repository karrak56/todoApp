import { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { searchInput, modalNewTask } from '../../action/action';
import { BiSearchAlt2 } from 'react-icons/bi'



const SecondPageHeader = () => {

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    return(
        <div className='flex flex-row justify-between items-center sm:h-20 h-28 sm:w-full mb-5 fixed left-0 px-10 top-0 z-10 w-full sm:px-0 sm:static sm:left-0 sm:top-0 sm:bg-none'>
            <div className='flex flex-row w-full items-center'>
                <Link to="/">
                    <p className='font-bold text-2xl mr-6'>EasyTodo</p>
                </Link>
                <input onChange={(e) => {setSearch(e.target.value); dispatch(searchInput(e.target.value))}} value={search} type="text" placeholder='Искать по названию или номеру' className="bg-gray-50 border-0 border-gray-100 text-gray-800 text-sm rounded-lg sm:w-2/5 w-full p-4 outline-0 hidden sm:block" />   
                
            </div>
            <BiSearchAlt2 color="blue" className='w-10 h-10 mr-4 sm:hidden block'/>  
            <button onClick={() => dispatch(modalNewTask(true))} className='px-1 py-2 sm:w-44 w-60 rounded-md bg-blue-600 hover:bg-blue-400 duration-150 text-white font-bold sm:text-lg text-base'>Новая задача</button>
            <div className='w-full h-full opacity-95 header bg-white absolute -z-10 top-0 left-0 block sm:hidden'></div>
        </div>
      
    )
}

export default SecondPageHeader