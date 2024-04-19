import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateAccount from "./pages/CreateAccount";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./services/providers/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <main className="sm:px-10 px-5 h-full">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chat/1" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<CreateAccount />} />
                    </Routes>
                    <Toaster />
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
