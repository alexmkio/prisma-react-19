import AllPosts from "@/components/allPosts";
import NewPost from "@/components/newPost";

export default async function Home() {
  return (
    <>
      <AllPosts />
      <NewPost />
    </>
  );
}
