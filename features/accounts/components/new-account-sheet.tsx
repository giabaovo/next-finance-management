import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useNewAccount} from "@/features/accounts/hooks/use-new-account";
import {AccountForm} from "@/features/accounts/components/account-form";
import {z} from "zod";
import {useCreateAccount} from "@/features/accounts/api/use-create-account";

export const NewAccountSheet = () => {

    const {isOpen, onClose} = useNewAccount()

    const formSchema = z.object({
        values: z.object({
            name: z.string({
                required_error: "Name is required"
            })
        })
    })

    type FormValues = z.input<typeof formSchema>

    const mutation = useCreateAccount()

    const handleSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle className="text-black">
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={handleSubmit}
                    disable={mutation.isPending}
                    defaultValues={{
                        values: {name: ""}
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}