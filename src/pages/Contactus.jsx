import { Phone, Mail } from "lucide-react"; // استخدام الأيقونات المطلوبة
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContact } from "../store/slices/contactSlice.js";

export default function ContactSection() {
    const dispatch = useDispatch();
    const { contact, isLoading, error } = useSelector((state) => state.contact);


    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // تحقق من وجود contact.data وتأكد أنه مصفوفة

    return (
        <div className=" px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="">
                    Feel free to contact us! Submit your queries here and we will listen.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {contact.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm border"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                {option.email ? <Mail size={24} /> : <Phone size={24} />}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {option.email ? "Email" : "Phone"}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {option.email || option.phone}
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                            Contact Us
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
