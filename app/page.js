import Link from "next/link";

async function fetchBlogs() {
  const resp = await fetch("http://localhost:3000/api/blog", { cache: 'no-store' });
  const data = await resp.json();
  console.log('data ', data);
  return data.posts;
}

// async function fetchMovies() {
//   const resp = await fetch("http://localhost:3000/api/mflix");
//   const data = await resp.json();
//   console.log('data ', data);
//   return data.movies;
// }

export default async function Home() {
  const posts = await fetchBlogs();
  // console.log('posts ', posts);
  return (
    <main className="flex flex-col p-10 w-full h-full">
      <div className="flex justify-center items-center bg-blue-900 w-1/3 align-center text-slate-50 rounded text-center mx-auto h-12">
        <h1>My FULL STACK Blog APP WITH NEXT.JS!!!!</h1>
      </div>
      <Link className="flex justify-center items-center bg-white w-1/5 rounded m-auto my-10 h-8" href={"/blog/add"}>Add New Blog</Link>
      <div className="flex flex-col">
        {
          posts?.map((post, index) => (
            <div className="bg-white m-4 flex p-2 rounded">
              <div className="flex flex-col grow">
                <p className="text-xl">{`${index}. ${post.title}`}</p>
                <p>{post.description}</p>
              </div>
              <Link href={`/blog/edit/${post.id}`} className="m-auto">Edit</Link>
            </div>
          ))
        }
      </div>
    </main>
  )
}
