import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, GitCompareArrows, Heart } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { ProductCard } from "@/types/product-card";
import { FormatCurrency } from "@/hooks/format-currency";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";

type ProductProps = {
  product: ProductCard;
};

interface AddCartItemDto {
  product_id: string;
  quantity: number;
}

export async function addToCart(
  accessToken: string,
  user_id: string,
  item: AddCartItemDto
): Promise<void> {
  try {
    const resCarts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const carts = await resCarts.json();
    let cart = carts.find((c: any) => c.user_id === user_id);
    if (!cart) {
      const resCreate = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id }),
        }
      );

      if (!resCreate.ok) throw new Error("Không thể tạo giỏ hàng");
      cart = await resCreate.json();
    }
    const resAddItem = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${cart.id}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: item.product_id,
          quantity: item.quantity,
        }),
      }
    );
    if (!resAddItem.ok) throw new Error("Không thể thêm sản phẩm vào giỏ");
    toast("Đã thêm");
  } catch (error) {
    console.error(error);
  }
}

export default function ProductCardComponent({ product }: ProductProps) {
  const { user, accessToken } = useUser();
  return (
    <Card className="group/product size-fit shadow-none text-center items-center">
      <CardContent className=" p-0">
        <div className="overflow-hidden relative">
          <Link href={`shop/${product.slug}`}>
            <Image
              className="transition-transform duration-300 ease-in-out transform group-hover/product:scale-110"
              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
              width={234}
              height={177}
              alt={product.name}
            />
          </Link>
          {/* todo */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center gap-1 opacity-0 group-hover/product:opacity-100 group-hover/product:bottom-5 transition-[opacity,bottom] duration-300">
            <Button variant="ghost" className="shop-control">
              <Heart />
            </Button>
            <Button variant="ghost" className="shop-control">
              <GitCompareArrows />
            </Button>
            <Button variant="ghost" className="shop-control">
              <Eye />
            </Button>
          </div>
        </div>
        <div className="grid justify-items-center">
          <h3>
            <Link
              href={`shop/${product.slug}`}
              className="hover:text-[#a8b324]"
            >
              {product.name}
            </Link>
          </h3>
          <span className="text-[#a8b324] my-1.5">
            {FormatCurrency(product.price)}
          </span>
        </div>
      </CardContent>
      <div
        className="w-[50px] group-hover/product:w-[100px] 
             transition-all duration-700 ease-in-out"
      >
        <Separator className="bg-[#999]" />
      </div>
      <CardFooter className="justify-center">
        <Button
          variant="ghost"
          className="hover:text-[#a8b324] hover:bg-white hover:cursor-pointer"
          onClick={() =>
            addToCart(accessToken, user.id, {
              product_id: product.id,
              quantity: 1,
            })
          }
        >
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
