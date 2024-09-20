import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {AccountForm} from "@/features/accounts/components/account-form";
import {z} from "zod";
import {useOpenAccount} from "@/features/accounts/hooks/use-open-account";
import {useGetAccount} from "@/features/accounts/api/use-get-account";
import {Loader2} from "lucide-react";
import {useEditAccount} from "@/features/accounts/api/use-edit-account";
import {useDeleteAccount} from "@/features/accounts/api/use-delete-account";
import {useConfirm} from "@/hooks/use-confirm";

const formSchema = z.object({
    values: z.object({
        name: z.string({
            required_error: "Name is required"
        })
    })
})

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = () => {

    const {isOpen, onClose, id} = useOpenAccount()

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction."
    )

    const isLoading = accountQuery.isLoading
    const isPending = editMutation.isPending || deleteMutation.isPending

    const handleSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const defaultValues = accountQuery.data ? {
        values: {name: accountQuery.data.name}
    } : {
        values: {name: ""}
    }

    return (
        <>
            <ConfirmDialog/>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4 bg-white">
                    <SheetHeader>
                        <SheetTitle className="text-black">
                            Edit Account
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing account.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                            </div>
                        ) : (
                            <AccountForm
                                id={id}
                                onSubmit={handleSubmit}
                                disable={isPending}
                                defaultValues={defaultValues}
                                onDelete={handleDelete}
                            />
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}