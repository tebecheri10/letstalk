"use server";

import { z } from 'zod';
import type { Post } from '@prisma/client';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { paths } from '@/paths';
import { auth } from '@/auth';	
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
})

interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form ?: string[]
    }
}

export async function createPost(slug: string, formState:CreatePostFormState, formData:FormData, ):Promise<CreatePostFormState>{
    //validate form
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    })  

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    //validate session
    const session = await auth();

    if(!session || !session?.user){
        return {
            errors: {
                _form  : ["You must be logged in to create a post"]
            }
        }
    }

    //validate topic
    const topic = await db.topic.findUnique({
        where: {
            slug
        }
    })

    if(!topic){
        return {
            errors: {
                _form: ["Topic not found"]
            }
        }
    }

    //create post
    let post:Post

    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                topicId: topic?.id,
                userId: session?.user?.id
            }
        })
    } catch (error: unknown) {
       if(error instanceof Error){
           return {
               errors: {
                   _form: [error.message]
               }
           }
       }else {
          return {
            errors: {
                _form: ["An unknown error occured"]
            }
          }
       }
    }

    //revalidate topic & redirect
    revalidatePath(paths.topicShow(slug))

    redirect(paths.postShow(slug, post.id))
}