import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {z} from "zod";
import {Loader2} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {useOpenCategory} from "@/features/categories/hooks/use-open-category";
import {useGetCategory} from "@/features/categories/api/use-get-category";
import {useEditCategory} from "@/features/categories/api/use-edit-category";
import {useDeleteCategory} from "@/features/categories/api/use-delete-category";
import {CategoryForm} from "@/features/categories/components/category-form";

const formSchema = z.object({
    values: z.object({
        name: z.string({
            required_error: "Name is required"
        })
    })
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {

    const {isOpen, onClose, id} = useOpenCategory()

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category."
    )

    const isLoading = categoryQuery.isLoading
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

    const defaultValues = categoryQuery.data ? {
        values: {name: categoryQuery.data.name}
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
                            Edit Category
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing category.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                            </div>
                        ) : (
                            <CategoryForm
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