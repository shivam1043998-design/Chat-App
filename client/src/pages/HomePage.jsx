import { useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div
      className="w-full h-screen sm:px-[15%] sm:py-[5%] bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <div
        className={`bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;