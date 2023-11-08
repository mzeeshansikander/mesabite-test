import AddView from "@/Views/Add";
import CategoryView from "@/Views/Category";
import HomeView from "@/Views/Home";
import { useGlobalStore } from "@/context/global";
import { ScreensTypes } from "@/enums";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";

export default function Home() {
  const { currentScreen } = useGlobalStore();
  return (
    // <main>
    //   <nav>
    //     <h1 className="text-[3rem]">Hello</h1>
    //   </nav>
    // </main>
    <div className="h-screen flex flex-col justify-center items-center border-2 bg-[#FFF6DF] overflow-y-scroll">
      {/* NavBar */}
      {currentScreen === ScreensTypes.HOME && (
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
      )}
      {/* h-screen */}
      {currentScreen === ScreensTypes.HOME && <HomeView />}
      {currentScreen === ScreensTypes.FOLDER && <AddView />}
      {currentScreen === ScreensTypes.CATEGORY && <CategoryView />}
    </div>
  );
}
