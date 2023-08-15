import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { main } from "../blog/route";

export const GET = async(req, res) => {
    console.log('GET!!');
    try {
        await main();
        console.log('prisma:::  ', prisma);
        const movies = await prisma.comment.findMany();
        console.log('movies:::  ', movies);
        return NextResponse.json({ message: "Success", movies }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};