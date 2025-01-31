import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAbout } from "../store/slices/aboutSlice.js"
import { Translate } from "translate-easy"; // استيراد الترجمة


export default function AboutUS() {

    const dispatch = useDispatch()

    const { about, isLoading, error } = useSelector(state => state.about)

    useEffect(() => {
        dispatch(fetchAbout())
    }, [dispatch])

    if (isLoading) {
        return <h1><Translate>Loading...</Translate></h1>
    }

    return (
        <div className='mt-10 mx-auto text-center'>
            {about.map((item) => (
                <div key={item._id}>
                    <h1 className='text-4xl font-bold mb-5'>
                        <Translate>About Us</Translate>
                    </h1>
                    <h2 className='text-xl font-semibold text-green-500 m-10'>
                        <Translate>Who We Are</Translate>
                    </h2>
                    <p className='text-lg'>
                        <Translate>{item.details}</Translate>
                    </p>
                </div>
            ))}
        </div>
    )
}
