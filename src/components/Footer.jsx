import Logo from "../assets/footerLogo.png"
import {Translate} from "translate-easy";

export default function Footer() {
  return (
    <footer className="mt-4 bg-gradient-to-r bg-green-600 px-10 font-sans tracking-wide">
      {/* <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center">
          <img src={Logo} className="w-60 text-center" alt=""/>
        </div>
        <p className="text-sm mt-8 text-gray-300">
          <Translate>
            Watch live football matches, follow real-time scores, and stay updated with the latest football news,
            articles, and match highlights on Live Footballia.
          </Translate>
        </p>
      </div> */}
      {/* <hr className="my-10 mx-auto max-w-5xl border-gray-500"/> */}
      <div className=" max-md:flex-col gap-4 py-6">
        <p className="text-sm text-center text-gray-300">
          <Translate>
            Copyright © 2025 - Live Footballia. All rights reserved
          </Translate>
        </p>
      </div>
    </footer>
  )
}
