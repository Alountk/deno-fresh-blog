import type { Post } from "../types.d.ts";
import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "$md/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  let raw: string;
  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch (e) {
    console.log(e);
    return null;
  }

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;
  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };
  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promise: Promise<Post | null>[] = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    if (entry.isFile) {
      promise.push(loadPost(entry.name.replace(".md", "")));
    }
  }
  const posts = await Promise.all(promise);
  return posts.filter((post) => post !== null).sort((a, b) =>
    b!.date.getTime() - a!.date.getTime()
  ) as Post[];
}

export async function listPostsSequentially(): Promise<Post[]> {
  const posts: Post[] = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    if (entry.isFile) {
      const post = await loadPost(entry.name.replace(".md", ""));
      if (post) posts.push(post);
    }
  }
  return posts;
}
