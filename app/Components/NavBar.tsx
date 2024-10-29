import Link from "next/link";
import { text } from "stream/consumers";
import ActiveLink from "./ActiveLink";

export default function NavBar() {

    const navItem=[
        {path:'/contacto',text:"Contacto"},
        {path:'/about', text:"Información"},
        { path: '/registro', text: "Registro" },
        {path:'/',text:"Otros"}
    ]
   
 
    return (
    <div>
        <nav className="bg-gray-800">
        
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</a>
            
            {
                    navItem.map(navItem =>(
                        <ActiveLink key={navItem.path} {...navItem}></ActiveLink>
                    ))
                }

          </div>
        </div>
        </nav>
    </div>
  )
}
