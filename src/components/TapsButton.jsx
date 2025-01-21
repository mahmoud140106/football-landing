import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function TabButton({ selectedTab, setSelectedTab }) {
    const handleTabChange = (value) => {
        setSelectedTab(value); // تغيير التاب المحدد
    };

    return (
        <div className='flex justify-end'>
            <Tabs defaultValue={selectedTab} className="w-[400px] ">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger onClick={() => handleTabChange('yesterday')} value="yesterday">
                        Yesterday
                    </TabsTrigger>
                    <TabsTrigger onClick={() => handleTabChange('today')} value="today">
                        Today
                    </TabsTrigger>
                    <TabsTrigger onClick={() => handleTabChange('tomorrow')} value="tomorrow">
                        Tomorrow
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
