import { listPosts, loadPost } from "./posts.ts";
import { assertEquals, assertMatch } from "$std/testing/asserts.ts";

Deno.test("loadPost() returns null if the post does not exist", async () => {
  const post = await loadPost("non-existent-post");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if post does exist", async () => {
  const post = await loadPost("hello-world");
  assertEquals(post?.id, "hello-world");
  assertEquals(post?.title, "Hello World");
  assertMatch(post?.body!, /This is a heading 2/);
});

Deno.test("listPosts() returns a list of posts", async () => {
  const posts = await listPosts();
  assertEquals(posts.length, 2);
  assertEquals(posts[0].id, "hello-world");
  assertEquals(posts[1].id, "second-post");
});

Deno.test("listPosts() retuerns a order list by date", async () => {
  const posts = await listPosts();
  assertEquals(posts[0].id, "second-post");
  assertEquals(posts[1].id, "hello-world");
});
