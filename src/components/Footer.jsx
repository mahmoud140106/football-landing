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
                        We’re a diverse and passionate team that takes ownership of your design and empower you to execute the roadmap. We stay light on our feet and truly enjoy delivering great work.
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
                    <Translate>
                        Made by
                    </Translate>
                    <a href="https://dramcode.top" className="text-md font-semibold text-gray-100 hover:text-white transition-colors">
                        <Translate>
                            &#34; DRAM Code &#34;
                        </Translate>
                    </a>
                    <Translate>
                        Team
                    </Translate>
                </p>

            </div>
        </footer>
    )
}
