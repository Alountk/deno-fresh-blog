import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts } from "../services/posts.ts";
import { Post } from "../types.d.ts";

export const handler: Handlers = {
  async GET(request: any, context: any) {
    const posts: Post[] = await listPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { posts } = props?.data || {};
  return (
    <main class="p-4">
      <h1 class="text-2xl">
        My Blog
      </h1>
      {posts.map((post: Post) => {
        return (
          <article class="p-4">
            <h2 class="text-2xl font-bold">
              <a
                class="hover:text-blue-500"
                href={`/blog/${post.id}`}
              >
                {post.title}!
              </a>
            </h2>
            <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
          </article>
        );
      })}
    </main>
  );
}
