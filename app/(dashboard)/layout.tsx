import React from "react";
import Header from "@/components/header";
import {getToken} from "@/features/tokens/api/get-tokens";


type Props = {
    children: React.ReactNode
}

const DashboardLayout = async ({children}: Props) => {
    const token = await getToken()
    return (
        <>
            <Header token={token}/>
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}

export default DashboardLayout