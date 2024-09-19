'use client'

import NavButton from "@/components/nav-button";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {useMedia} from "react-use";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {setToken} from "@/features/tokens/api/set-tokens";
import {useOnceRender} from "@/features/common/use-once-render";

const routes = [
    {
        href: "/",
        label: "Overview"
    },
    {
        href: "/transactions",
        label: "Transactions"
    },
    {
        href: "/accounts",
        label: "Accounts"
    },
    {
        href: "/categories",
        label: "Categories"
    },
    {
        href: "/settings",
        label: "Settings"
    },
]

type NavigationProps = {
    token: {
        access: string,
        refresh: string
    }
}

const Navigation = ({token}: NavigationProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const pathName = usePathname()

    const isMobile = useMedia('(max-width: 1024px)', false)

    const { isRender, setIsRender } = useOnceRender()

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    useEffect(() => {
        setIsRender()
        if (isRender) {
            setToken(token)
        }
    }, [isRender]);

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2 bg-white">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathName ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start text-black"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathName === route.href}
                />
            ))}
        </nav>
    )
}

export default Navigation