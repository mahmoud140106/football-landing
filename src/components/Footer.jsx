import Logo from "../assets/footerLogo.png"
import { Translate } from "translate-easy"; // استيراد الترجمة

export default function Footer() {
    return (
        <footer className="mt-10 bg-gradient-to-r bg-green-600   py-10 px-10 font-sans tracking-wide">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center">
                    <img src={Logo} className="w-60 text-center" alt="" />
                </div>
                <p className="text-sm mt-8 text-gray-300">
                    <Translate>
                        Watch live football matches, follow real-time scores, and stay updated with the latest football news, articles, and match highlights on Live Footballia.
                    </Translate>
                </p>
            </div>
            <hr className="my-10 mx-auto max-w-5xl border-gray-500" />
            <div className=" max-md:flex-col gap-4 space-y-2">
                <p className="text-sm text-center text-gray-300">
                    <Translate>
                        Copyright © 2025 - Live Footballia. All rights reserved
                    </Translate>
                </p>

                <p className="text-sm text-center text-gray-300">
                    Made by
                    <a href="https://dramcode.top" target={"_blank"} className="text-md font-semibold text-gray-100 hover:text-white transition-colors">
                        &#34; DRAM Code &#34;
                    </a>
                    Team
                </p>

            </div>
        </footer>
    )
}
