"use client";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const hasScrolledPast = rect.top <= 0;

      setShowHeader(hasScrolledPast);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { slug } = use(params);
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Test"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/shop" },
          { label: "Test" },
        ]}
      />
      <div className="grid grid-cols-2 gap-12">
        <div className="ml-20 border size-120">
          <Image
            className="w-full h-auto"
            src="/images/test.jpg"
            alt="test"
            width={200}
            height={200}
          ></Image>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <Badge className="border-0 bg-[#defaf2] text-black h-5">
              con hang lhong
            </Badge>
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="hover:no-underline hover:cursor-pointer hover:text-[#a8b324]"
                  >
                    Trước
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 p-1.5">
                  <Link href="/">
                    <div className="grid grid-cols-3 grid-rows-2">
                      <div className="row-span-2">
                        <Image
                          alt="gg"
                          src="/images/test.jpg"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="col-span-2 hover:text-[#a8b324]">tt</div>
                      <div className="col-span-2 col-start-2 row-start-2 text-[#a8b324]">
                        tttttt
                      </div>
                    </div>
                  </Link>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="hover:no-underline hover:cursor-pointer hover:text-[#a8b324]"
                  >
                    Sau
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 p-1.5">
                  <Link href="/">
                    <div className="grid grid-cols-3 grid-rows-2">
                      <div className="row-span-2">
                        <Image
                          alt="gg"
                          src="/images/test.jpg"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="col-span-2 hover:text-[#a8b324]">
                        2dfffffff
                      </div>
                      <div className="col-span-2 col-start-2 row-start-2 text-[#a8b324]">
                        3dfdddddddddd
                      </div>
                    </div>
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <h2 className="font-bold text-3xl text-green-900 mb-5">Test</h2>
          <p className="text-yellow-900 font-bold mb-5">1234 vnd</p>
          <p className="mb-5">mo ta 123</p>
          <div className="flex items-center w-3/6 space-x-2">
            <Input type="number" min={1} />
            <Button
              type="submit"
              className="bg-yellow-600 hover:cursor-pointer hover:bg-yellow-900"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
          <div>
            <Button
              variant="ghost"
              className="freshio-icon-random hover:bg-white hover:cursor-pointer hover:text-yellow-500"
            >
              So sánh
            </Button>
            <Button
              variant="ghost"
              className="freshio-icon-heart hover:bg-white hover:cursor-pointer hover:text-yellow-500"
            >
              Danh sách yêu thích
            </Button>
          </div>
          <Separator className="my-5" />
          <p className="mb-5">
            SKU: <span className="text-[#999]">test</span>
          </p>
          <p>
            Categories:{" "}
            <span>
              <Button variant="link" className="p-0 text-[#999]">
                Chưa xếp loại
              </Button>
              {","}{" "}
              <Button variant="link" className="p-0 text-[#999]">
                Đóng gói
              </Button>
            </span>
          </p>
        </div>
      </div>
      <div ref={targetRef} className="h-[600px] bg-gray-100">
        <p className="text-center pt-40"></p>
      </div>
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="border">
                <Image alt="gg" src="/images/test.jpg" width={60} height={60} />
              </div>
              <div>
                <p>Bạn đang xem: Test</p>
                <p className="text-yellow-600">12312312</p>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-900"
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
