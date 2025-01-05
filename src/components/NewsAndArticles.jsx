import Advertisement from "./Advertisement"
import { Button } from './ui/button'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

export default function NewsAndArticles() {
    return (
        <div className="my-5 w-full">
            <div className="h-[337px]">
                <Advertisement />
            </div>
            <div className="w-full my-5">
                <div className="mb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>

                    </Card>

                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>
                    </Card>


                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>
                    </Card>


                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>
                    </Card>


                    <Card className="">
                        <CardHeader>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW7n0hMlS1HhgC_bRcZWZNu56q-shY0E1ZTkAxDAT0YC3sINzJDXYk7xN6OzjSyjimgaQ&usqp=CAU" alt="" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription >
                                Select a template to get started, or create your own from scratch.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <Button
                    variant={"outline"}
                >View all news</Button>
            </div>

            <div className="h-[337px]">
                <Advertisement />
            </div>


        </div>
    )
}
