
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPrivacy } from "../store/slices/privacySlice.js"

export default function Privacy() {

    const dispatch = useDispatch()

    const { privacy, isLoading, error } = useSelector(state => state.privacy)

    useEffect(() => {
        dispatch(fetchPrivacy())
    }, [dispatch])

    return (
        <div className='mt-10  text-center'>

            {privacy.map((item) => (
                <div key={item._id}>
                    <h1 className='text-4xl font-bold mb-5'>{item.title}</h1>
                    <p className='text-lg'>{item.details}</p>
                </div>
            ))}

        </div>
    )
}
