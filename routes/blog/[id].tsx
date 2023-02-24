import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../services/posts.ts";
import { Post } from "../../types.d.ts";
import { CSS } from "$md/mod.ts";

export const handler: Handlers = {
  async GET(request: any, context: any) {
    const { id } = context.params;
    const post: Post | null = await loadPost(id);
    return context.render({ post });
  },
};
export default function PagePost(props: PageProps) {
  const { post: { title, date, excerpt, body } } = props?.data || {};
  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{title}</h1>
      <time>{Intl.DateTimeFormat("es").format(date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div class="markdown-body" dangerouslySetInnerHTML={{ __html: body }} />
    </article>
  );
}
