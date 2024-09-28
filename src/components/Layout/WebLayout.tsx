import { ReactNode } from "react";
import Header from "../Web/Header/header";
import Footer from "../Web/Footer/footer";

export default function WebLayout({children} : {children:ReactNode}) {
    return (
        <>
            <Header />
                <div className="min-h-screen">
                    {children}
                </div>
            <Footer />
        </>
    )
}