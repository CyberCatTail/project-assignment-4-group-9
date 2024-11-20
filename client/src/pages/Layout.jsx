import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Toaster } from "@/components/ui/sonner"

function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white text-black p-4 justify-between items-center">
                <Navigation />
            </header>
            <div className="flex flex-1">
                <main className="flex-1 p-6 bg-gray-50">
                    {children}
                </main>
            </div>
            <Footer />
            <Toaster richColors />
        </div>
    );
}

export default Layout;