import AddView from "@/Views/Add";
import HomeView from "@/Views/Home";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";

export default function Home() {
  return (
    // <main>
    //   <nav>
    //     <h1 className="text-[3rem]">Hello</h1>
    //   </nav>
    // </main>
    <div className="flex flex-col justify-center items-center border-2 bg-[#FFF6DF] ">
      {/* NavBar */}
      <div className="bg-[#FFCD00] flex justify-between items-center px-4 h-[65px] w-full border-b-2 border-[#852E2C]">
        {/* Menu Button */}
        <div className="w-[18.57px] h-[11.43px]">
          <Image
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src="/assets/menuIcon.png"
          />
        </div>
        {/* Language Selection */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-[24px] h-[24px]">
            <Image
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src="/assets/en-flag.png"
            />
          </div>
          <BsChevronDown />
        </div>
      </div>
      {/* h-screen */}
      <HomeView />
      {/* <AddView /> */}
    </div>
  );
}
