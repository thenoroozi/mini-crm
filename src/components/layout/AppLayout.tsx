import { Outlet } from 'react-router'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
   return (
      <div className="min-h-screen">
         <Sidebar />
         <div className="lg:pl-[188px] xl:pl-[246px]">
            <Header />
            <main className="px-4 pb-24 lg:px-8 lg:pb-8">
               <Outlet />
            </main>
         </div>
         <BottomNav />
      </div>
   )
}