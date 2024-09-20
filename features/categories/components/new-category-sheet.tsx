import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {z} from "zod";
import {CategoryForm} from "@/features/categories/components/category-form";
import {useNewCategory} from "@/features/categories/hooks/use-new-category";
import {useCreateCategory} from "@/features/categories/api/use-create-category";

const formSchema = z.object({
    values: z.object({
        name: z.string({
            required_error: "Name is required"
        })
    })
})

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = () => {

    const {isOpen, onClose} = useNewCategory()

    const mutation = useCreateCategory()

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
                        New Category
                    </SheetTitle>
                    <SheetDescription>
                        Create a new category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
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