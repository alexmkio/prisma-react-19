import AllPosts from "@/components/allPosts";
import NewPost from "@/components/newPost";
import PublishedPosts from "@/components/publishedPosts";

export default async function Home() {
  return (
    <>
      <AllPosts />
      <PublishedPosts />
      <NewPost />
    </>
  );
}
