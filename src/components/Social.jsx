import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSocial } from '../store/slices/socialSlice'
import { Link } from 'react-router-dom' // تأكد من استخدام `react-router-dom` بدلاً من `react-router`

export default function Social() {
    const dispatch = useDispatch()

    const { social, isLoading, error } = useSelector(state => state.social)

    useEffect(() => {
        dispatch(fetchSocial())
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='p-4 max-h-[500px] overflow-y-auto'>
            {social.map((item) => (
                <div className='mt-5' key={item._id}>
                    <Link to={item.link} target={"_blank"}>
                        <img
                            loading="lazy"
                            className='w-[50px] h-[50px] rounded-full object-cover'
                            src={item.image} alt={item.name}
                        />
                    </Link>
                </div>
            ))}
        </div>
    )
}

