import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

const formSchema = z.object({
    values: z.object({
        name: z.string({
            required_error: "Name is required"
        })
    })
})

type FormValues = z.input<typeof formSchema>

type AccountFormProps = {
    id?: string
    defaultValues?: FormValues
    onSubmit: (value: FormValues) => void
    onDelete?: () => void
    disable?: boolean
}

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disable
}: AccountFormProps) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const handleSubmit = (values: FormValues) => {
        onSubmit(values)
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="values.name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black font-bold">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disable}
                                    placeholder="e.g. Cash, Bank, Credit Card"
                                    className="focus-visible:outline-black"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full font-bold" disabled={disable}>
                    {id ? "Save changes" : "Create account"}
                </Button>
                {!!id && (
                    <Button
                        type="button"
                        disabled={disable}
                        onClick={handleDelete}
                        className="w-full text-black font-bold"
                        variant="outline"
                    >
                        <Trash className="size-4 mr-2"/>
                        Delete account
                    </Button>
                )}
            </form>
        </Form>
    )
}