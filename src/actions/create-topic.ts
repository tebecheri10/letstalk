"use server";

import { db } from '@/db'
import { z } from 'zod'
import { auth } from '@/auth'
import { paths } from '@/paths'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import  type { Topic } from '@prisma/client'

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, { message: "Only lowercase letters and dashes allowed" }),
    description: z.string().min(10),
})

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form ?: string[]
    }
}

export const createTopic = async(formState:CreateTopicFormState, formData: FormData):Promise<CreateTopicFormState>=>{
    const result = createTopicSchema.safeParse({
        name : formData.get("name"),
        description:formData.get("description")
    })

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors
    }}

    const session = await auth()

    if(!session || !session?.user){
        return {
            errors: {
                _form: ["You must be logged in to create a topic"]
            }
        }
    }

    let topic:Topic

    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            }
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }else{
            return {
                errors: {
                    _form: ["An unknown error occurred"]
                }
            }
        }
    }

    revalidatePath("/")
    redirect(paths.topicShow(topic.slug))
}
