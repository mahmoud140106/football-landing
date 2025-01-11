import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAbout } from "../store/slices/aboutSlice.js"

export default function AboutUS() {

    const dispatch = useDispatch()

    const { about, isLoading, error } = useSelector(state => state.about)

    useEffect(() => {
        dispatch(fetchAbout())
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='mt-10 max-w-7xl mx-auto text-center'>

            {about.map((item) => (
                <div key={item._id}>
                    <h1 className='text-4xl font-bold mb-5'>{item.title}</h1>
                    <p className='text-lg'>{item.details}</p>
                </div>
            ))}





        </div>
    )
}
