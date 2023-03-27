import {Controller, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {SaveAs} from "@mui/icons-material";
import React, {useEffect} from "react";
import {useCreatePost} from "../hooks/useCreatePost";
import {LinearProgressIndicator} from "../../common/components/ProgressIndicator";

type NewPostFormProps = {
    handleClose: () => void;
}

// TODO: Support Rich Text, Markdown and HTML with a WYSIWYG editor and convert between formats by listening to onPaste events
export const NewPostForm = ({handleClose}: NewPostFormProps) => {
    const {control, handleSubmit, reset} = useForm({mode: 'all'});
    const {createPost, isLoading, isError, savedPost} = useCreatePost();

    /**
     * If the post is saved, close the form and reset the form state
     */
    useEffect(() => {
        if (!isLoading && !isError && savedPost) {
            console.log('Saved post into state, closing form', savedPost);
            handleClose();
            reset();
        }
    }, [savedPost, isLoading, isError, handleClose, reset]);

    const onSubmit = (formData: any) => {
        const title = formData.title;
        const author = formData.author;
        const content = formData.content;

        createPost(title, author, content);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name={'title'}
                    defaultValue={''}
                    rules={{required: true, maxLength: 50}}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            fullWidth
                            label="Title"
                            margin="normal"
                            error={error !== undefined}
                            helperText={error ? 'Required and must be a maximum of 50 characters' : ''}
                            required
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'author'}
                    defaultValue={''}
                    rules={{required: true, maxLength: 50}}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Author"
                            margin="normal"
                            error={error !== undefined}
                            helperText={error ? 'Required and must be a maximum of 50 characters' : ''}
                            required
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'content'}
                    defaultValue={''}
                    rules={{required: true, maxLength: 10000}}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Content"
                            margin="normal"
                            error={error !== undefined}
                            helperText={error ? 'Required and must be a maximum of 10000 characters' : ''}
                            required
                            multiline
                            rows={20}
                        />
                    )}
                />
                <Button
                    type={'submit'}
                    disabled={isLoading}
                    fullWidth
                    size={'large'}
                    variant='contained'
                    startIcon={<SaveAs/>}>
                    Create post
                </Button>
            </form>
            {isLoading && <LinearProgressIndicator loadingText={''}/>}
        </>
    )
}