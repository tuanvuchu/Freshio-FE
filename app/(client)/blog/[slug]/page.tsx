"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/search-form";
import { FormatDate } from "@/hooks/format-date";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import BlogTag from "../../../../components/tag";
import BlogCategory from "../../../../components/category";
import type { Blog } from "@/types/blog";
import BlogRecentPost from "../components/blog-recent-post";
import BreadcrumbComponent from "@/components/breadcrumb";

const tags = [
  "Kinh doanh",
  "lành mạnh",
  "tự nhiên",
  "hữu cơ",
  "Bài viết",
  "cà chua",
  "Chủ đề",
];

async function getBlogPost(slug: string, token: string): Promise<Blog> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/get-by-slug?slug=${slug}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Oops");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [blogData] = await Promise.all([getBlogPost(slug, token)]);
        setBlog(blogData);
      } catch (err) {
        console.error(err);
        setError("err");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BreadcrumbComponent
        title="Về chúng tôi"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Về chúng tôi" },
        ]}
      />
      <div className="grid grid-cols-8 gap-4 px-7.5">
        <div className="col-span-6 mr-12 pr-12 border-r">
          <article className="mb-12.5">
            {blog.categories.map((p, i) => (
              <Button
                key={i}
                className="bg-[#a8b324] hover:bg-[#80891b] mb-3.5 max-h-6"
              >
                <Link href={`category/${p.slug}`}>{p.name}</Link>
              </Button>
            ))}
            <h2 className="mb-3.5 text-[#0a472e] font-bold text-3xl leading-10">
              {blog.title}
            </h2>
            <header>
              <div className="flex mb-3 text-[#0a472e]">
                <span className="freshio-icon-calendar px-1.5">
                  <Link
                    className="underline pl-1.5"
                    href={`/blog/${blog.slug}`}
                  >
                    {FormatDate(blog.created_at)}
                  </Link>
                </span>
                {"/"}
                <span className="freshio-icon-user px-1.5">
                  {" "}
                  bởi
                  <Link
                    className="underline pl-1.5"
                    href={`/blog/author/${blog.author}`}
                  >
                    {blog.author}
                  </Link>
                </span>
                {"/"}
                <span className="freshio-icon-comments-alt px-1.5">
                  {" "}
                  {blog.comment_count}
                </span>
              </div>
            </header>
            <Separator className="my-5" />
            <Image
              className="mb-5.5"
              src={`${process.env.NEXT_PUBLIC_API_URL}/${blog.image}`}
              width={1000}
              height={565}
              alt="Picture of the author"
            />
            <div className="pt-5">
              <div className="mb-5">
                {blog.content.map((p, i) => {
                  if (p.paragraph) {
                    return (
                      <p className="text-[#555] text-[14px] mb-5" key={i}>
                        {p.paragraph}
                      </p>
                    );
                  }
                  if (p.quote) {
                    return (
                      <blockquote
                        key={i}
                        className="leading-9 text-[#333] text-[20px] pl-9 my-7 border-l-5 border-[#a8b324]"
                      >
                        {p.quote}
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </article>
        </div>
        <div className="col-span-2 col-start-7">
          <SearchForm />
          <BlogCategory />
          <BlogRecentPost />
          <BlogTag tags={tags} />
        </div>
      </div>
    </>
  );
}
