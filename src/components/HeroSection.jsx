import { Button } from "./ui/button"

export default function HeroSection() {
    return (
        <div className='w-full h-[450px] bg-green-500 p-5 rounded-md'>
            <div className='flex justify-between'>
                <Button variant={"outline"}>Click to watch</Button>
                <img
                    className='w-32'
                    src="https://readymadeui.com/readymadeui.svg" alt="" />
            </div>
            <div className="max-w-3xl mt-7 mx-auto grid grid-cols-3 gap-4">
                <div className="w-full grid items-center justify-center text-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                        alt="Barcelona"

                        className="w-[200px]"
                    />
                    <h1 className="mt-4 text-white text-4xl font-bold ">Team Name</h1>
                </div>

                <div className="grid text-center h-full flex-col items-center space-y-6">
                    <h1 className="text-4xl font-bold text-white">Club Data</h1>
                    <span className="text-3xl font-bold text-white">VS</span>
                    <h4 className="text-xl font-semibold text-white">5:00 pm</h4>
                </div>

                <div className="w-full grid items-center justify-center text-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                        alt="Barcelona"
                        className="w-[200px]"
                    />
                    <h1 className="mt-4 text-white text-4xl font-bold ">Team Name</h1>
                </div>
            </div>
        </div>
    )
}
