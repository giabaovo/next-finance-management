'use client'

import {JSX, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export const useConfirm = (
    title: string,
    message: string
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClose()
        }
    }

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="bg-white text-black" onKeyDown={(event) => handleKeyDown(event)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmationDialog, confirm]
}