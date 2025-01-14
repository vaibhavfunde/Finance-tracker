// import { UserButton ,ClerkLoaded ,ClerkLoading } from "@clerk/nextjs";
// import { HeaderLogo } from "./header-logo";
// import Navigation from "./navigation";
// import { Loader2 } from "lucide-react";
// import WelcomeMsg from "./welcomeMsg";
// import filters from "./filters";
// const Header = () => {
//     return ( 
//         <header className="bg-gradient-to-b from-blue-700 to-blue-500
//         px-4 py-8 lg:px-14 pb-36">
           
//            <div className="max-w-screen-2xl mx-auto">
                
//                 <div className="w-full flex items-center justify-between mb-14">

//                     <div className="flex items-center lg:gap-x-16">
//                        <HeaderLogo></HeaderLogo>
//                        <Navigation></Navigation>
//                     </div>
//                     <ClerkLoaded>
//                     <UserButton afterSignOutUrl="/"></UserButton>
//                     </ClerkLoaded>
//                     <ClerkLoading>
//                      <Loader2 className="size-8 animate-spin text-slate-400"></Loader2>
//                     </ClerkLoading>

//                 </div>
//                 <WelcomeMsg></WelcomeMsg>
//                 <filters></filters>

//            </div>

//         </header>
//      );
// }
 
// export default Header;


import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import Navigation from "./navigation";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "./welcomeMsg";
import { Filters } from "@/components/filters";


const Header = () => {
    return (
        <header
            className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36"
        >
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    {/* Logo and Navigation */}
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>

                    {/* User Button or Loading Spinner */}
                    <div>
                        <ClerkLoaded>
                            <UserButton afterSignOutUrl="/" />
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        </ClerkLoading>
                    </div>
                </div>

                {/* Welcome Message and Filters */}
                <WelcomeMsg />
                <Filters />
            </div>
        </header>
    );
};

export default Header;
