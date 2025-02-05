import { Helmet } from "react-helmet-async";
import Advertisement from "../components/Advertisement";
export default function ViewMatch() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://livefootballia.com/viewMatches" />
        <meta
          name="description"
          content="Explore upcoming and live football matches with real-time scores, team lineups, and match details. Watch live football action on Live Footballia."
        />
      </Helmet>
      <div className="max-w-7xl mt-10 mx-auto">
        <div className="hidden md:block col-span-2 h-[300px]">
          <Advertisement />
        </div>
        <div
          className="mt-10 relative bg-cover bg-center lg:py-32"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6H72ghlNFM8DMi99WzlEgqcx4lKXyZU3v7w&s')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="lg:max-w-5xl lg:flex w-full items-center mx-auto relative z-10  h-full">
            <div className="flex max-w-2xl  items-center gap-3 w-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                alt="Barcelona"
                className="w-[150px]"
              />
              <h1 className="mt-4 text-white text-4xl font-bold ">Team Name</h1>
            </div>

            <div className=" grid-cols-1 hidden lg:flex  items-center max-w-1xl">
              <h3 className="mt-4 text-white text-center text-4xl font-bold w-full">
                VS
              </h3>
            </div>

            <div className="flex gap-4 lg:max-w-2xl justify-end  items-center w-full">
              <h1 className="mt-4 text-white  text-right text-4xl font-bold ">
                Team Name
              </h1>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
                alt="Barcelona"
                className="w-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="my-5">
          <h1 className="my-4 text-2xl font-semibold ">
            Watch New Yorks Match Live Stream – English Premier League
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum earum
            voluptates et quasi est corporis tenetur rem ex laboriosam, natus,
            dicta, quae inventore ducimus! Architecto blanditiis nulla atque
            rerum alias? Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Cumque dicta rem, ducimus sit officia delectus nesciunt
            voluptatum saepe! Mollitia voluptates dolorum laudantium autem quas
            itaque nulla modi alias nemo at!
          </p>
          <img
            className="w-full h-96"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6H72ghlNFM8DMi99WzlEgqcx4lKXyZU3v7w&s"
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum earum
            voluptates et quasi est corporis tenetur rem ex laboriosam, natus,
            dicta, quae inventore ducimus! Architecto blanditiis nulla atque
            rerum alias? Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Cumque dicta rem, ducimus sit officia delectus nesciunt
            voluptatum saepe! Mollitia voluptates dolorum laudantium autem quas
            itaque nulla modi alias nemo at!
          </p>
        </div>

        <div className="mt-3 hidden md:block col-span-2 h-[300px]">
          <Advertisement />
        </div>

        <div className="mt-3 hidden md:block col-span-2 h-[300px]">
          <Advertisement />
        </div>
      </div>
    </>
  );
}
