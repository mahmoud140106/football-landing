
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPrivacy } from "../store/slices/privacySlice.js"
import { Translate } from 'translate-easy';


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
                    <h1 className='text-4xl font-bold mb-5'><Translate>Our Privacy</Translate></h1>
                    <div className='mt-10 mx-auto text-center bg-green-200 p-10 rounded-md'>
                        <h1 className='text-2xl font-semibold mb-16'><Translate>Our WebSite Privacy</Translate></h1>
                        <p className='text-lg'><Translate>{item.details}</Translate></p>
                    </div>
                </div>
            ))}

        </div>
    )
}
