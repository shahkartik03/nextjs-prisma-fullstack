import { NextResponse } from "next/server";
import { main } from "../route";

export const GET = async(req, res) => {
    const id = req.url.split("/blog/")[1];
    console.log('GET');
    try {
        await main();
        const post = await prisma.post.findFirst({ where: { id }});
        if (!post)
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const PUT = async(req, res) => {
    console.log('PUT');
    const {title, description} =await req.json();
    try {
        const id = req.url.split("/blog/")[1];
        console.log('id ', id);
        await main();
        const post = await prisma.post.update({ data: { title, description }, where: { id }});
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const DELETE = async(req, res) => {
    console.log('DELET');
    try {
        const id = req.url.split("/blog/")[1];
        console.log('id ', id);
        await main();
        const post = await prisma.post.delete({ where: { id }});
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};