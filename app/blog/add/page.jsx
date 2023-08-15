"use client";

import { Fragment, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { data } from "../../MOCK_data.js";

export default function AddBlog() {
    useEffect(() => {
        data.map(async (post) => 
            await saveNewBlog({ title: post.title, description: post.description }))
    }, []);
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const saveNewBlog = async ({ title, description }) => {
        const res = fetch("http://localhost:3000/api/blog", {
            method: "POST",
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
        toast.loading("sending Request", { id: "1"});
        await saveNewBlog({ title: titleRef.current?.value, description:  descriptionRef.current?.value });
        toast.success("Blog Posted successfully", { id: "1"});
    }
    return (
    <Fragment>
        <Toaster />
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-content item-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">
                    Add a Wonderful Blog
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