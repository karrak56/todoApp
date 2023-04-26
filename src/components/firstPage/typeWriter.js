import { useEffect, useRef, useState } from "react"

const TypeWriter = () => {
    const index = useRef(0)

    const [currentText, setCurrentText] = useState('')
    const text = '  Создайте новый проект, или выберите уже существующий'

    useEffect(() => {
        index.current = 0
        setCurrentText('')
    },[text])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentText((value) => value + text.charAt(index.current))
            index.current += 1
        }, 100)
        return () => {
            clearTimeout(timeoutId)
        }

    }, [currentText, text])

    return <p className='xl:text-7xl lg:text-5xl sm:text-4xl text-3xl text-center mb-12 w-4/5'>{currentText}</p>
}

export default TypeWriter