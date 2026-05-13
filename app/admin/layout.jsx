import { assets } from "@/Assets/assets";
import SideBar from "@/Components/AdminComponents/SideBar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <SideBar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 mx-h-[60px] px-12 border border-black">
                        <h3 className="font-bold">Admin Pannel</h3>
                        <Image src={assets.profile_icon} width={40} alt="profile" />
                    </div>
                    {children}

                </div>
            </div>
        </>
    )
}

