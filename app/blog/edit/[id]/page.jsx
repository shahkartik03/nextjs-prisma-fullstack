"use client";
import React, { Fragment, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EditPage = (params) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    useEffect(async () => {
        toast.loading('fetching post', {id: "1"});
        const data = await getBlogById(params?.params.id);
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
        toast.success("Fetch complete", {id: "1"});
    }, []);
    
    const editNewBlog = async ({ title, description }) => {
        const res = fetch(`http://localhost:3000/api/blog/${params?.params.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                description
            }),
            "content-Type": "application/json"
        });
        return (await res).json();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(titleRef?.current?.value);
        toast.loading("sending Request", { id: 1});
        await editNewBlog({ title: titleRef.current?.value, description:  descriptionRef.current?.value });
        toast.success("Blog Updated successfully", { id: 1});
    }
    const getBlogById = async (id) => {
        const resp = await fetch(`http://localhost:3000/api/blog/${id}`);
        const data = await resp.json();
        return data.post;
    }
  return (
    <Fragment>
        <Toaster />
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-content item-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">
                    Edit a Wonderful Blog
                </p>
                <form onSubmit={handleSubmit}>
                    <input type="text" ref={titleRef} className="rounded-md px-4 py-2 my-2" placeholder="Enter Title"/>
                    <textarea className="rounded-md px-4 py-2 w-full my-2" ref={descriptionRef} placeholder="Enter description"/>
                    <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">Submit</button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default EditPage;
