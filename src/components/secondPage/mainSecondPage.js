import SecondPageHeader from './secondPageHeader'
import SecondPageTodo from './secondPageTodo'
import ModalTask from './modalTask'
import EditTask from './editTask'
import DeleteModalTask from './deleteModalTask'
import { useParams } from 'react-router-dom'
import { currentProject } from '../../action/action'
import { useDispatch } from 'react-redux'

const MainSecondPage = () => {
    
    const dispatch = useDispatch()
    const smth = useParams()
    dispatch(currentProject(smth.id))
   
    return(
        <>  
            <EditTask/>
            <ModalTask/>
            <DeleteModalTask/>
            <div className="container mx-auto my-0 h-full pt-10 px-10">
                <SecondPageHeader/>
                <SecondPageTodo/>
            </div>
        </>
    )
}

export default MainSecondPage