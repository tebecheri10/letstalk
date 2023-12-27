"use client";

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

interface PostCreateFormProps {
    slug: string
}

const PostCreateForm = ({slug}:PostCreateFormProps) => {
    
  const [formState, action] = useFormState(actions.createPost.bind(null, slug), { errors: {} });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="success">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
            ></Input>
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Write your post"
            />
            {formState?.errors?._form && (
              <span className="bg-red-200 border border-red-600 p-2 rounded">
                {formState?.errors?._form?.join(", ")}
              </span>
            )}
            <FormButton>Create</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
