import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import 'animate.css';

const NewProjects = () => {

    const [arr, setArr] = useState([])
    const storageLength = localStorage.length
    
    useEffect(() => {   
        const arrProm = []
        for (var i = 0; i < localStorage.length; i++) {
            arrProm.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        } 
        setArr(arrProm)  
    }, [])


    useEffect(() => {
        const arrProm = []
        for (var i = 0; i < localStorage.length; i++) {
            arrProm.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        } 
        setArr(arrProm)  
    }, [storageLength])

    return(
        <div className="flex sm:flex-row flex-col items-center flex-wrap justify-center w-full">
            <NewProject arr={arr}/>
        </div>
    )
}


const NewProject = ({arr}) => {

    return(
        arr.map((item, i) => (
            (<Link key={i} className="sm:w-1/4 lg:1/4 w-3/4 h-44 mr-4 mt-4" to={`/${item.id}`}><button className={`lg:p-8 w-full h-full bg-gray-50 hover:bg-blue-50 duration-150 p-2 rounded-3xl animate__animated ${localStorage.length ? 'animate__bounceIn' : 'animate__fadeOut'}`}>
            <p className="lg:text-xl text-lg font-bold">{item.projectName}</p>
            <p className="lg:text-base text-xs">{item.projectDesc}</p>
        </button></Link>)
        ))
    )
}


export default NewProjects