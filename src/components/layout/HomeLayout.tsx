import { ChevronLeft } from "lucide-react"
import { ReactNode } from "react"
import { useNavigate, useLocation } from "react-router-dom";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 bg-white border shadow-lg h-14 item s-center">
        {location.pathname !== "/" && < ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => {
          if (location.pathname !== "/") {
            navigate(-1)
          }
        }} />}

        <h1 className="text-lg font-medium text-center lg:text-start lg:px-14">iRecharge Weather App</h1>

        <div></div>
      </header>
      <main className="mt-14">
        {children}
      </main>
    </div>
  )
}
export default HomeLayout