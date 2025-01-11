import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTab } from '../store/slices/MatchesListSlice'

export default function TabButton() {
    const selectedTab = useSelector((state) => state.matches?.selectedTab)  // Use optional chaining to prevent errors

    const dispatch = useDispatch()

    const handleTabChange = (value) => {
        dispatch(setSelectedTab(value))
    }

    return (
        <Tabs defaultValue={selectedTab || "today"} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger onClick={() => handleTabChange('yesterday')} value="yesterday">yesterday</TabsTrigger>
                <TabsTrigger onClick={() => handleTabChange('today')} value="today">today</TabsTrigger>
                <TabsTrigger onClick={() => handleTabChange('tomorrow')} value="tomorrow">tomorrow</TabsTrigger>
            </TabsList>
            <TabsContent value="yesterday">

            </TabsContent>
            <TabsContent value="today">

            </TabsContent>

            <TabsContent value="tomorrow">

            </TabsContent>
        </Tabs>
    )
}

