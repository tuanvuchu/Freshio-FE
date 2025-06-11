"use client";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import { FormatDate } from "@/hooks/format-date";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderDetail({ id }: { id: string }) {
  const { user, accessToken } = useUser();
  const [order, setOrder] = useState<any>(null);

  async function getCart(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/get-test?id=${id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setOrder(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id && accessToken) {
      getCart(id);
    }
  }, [user, accessToken]);

  return (
    <>
      <div className="">
        {order && (
          <div className="flex justify-between pb-5">
            <p>Ngày tạo: {FormatDate(order.created_at)}</p>
            <p>Tổng: {FormatCurrency(order.total)}</p>
          </div>
        )}
        {order?.order_items?.map((p, i) => (
          <div key={i} className="flex pb-5">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${p.products.image}`}
              width={50}
              height={50}
              alt={p.products.name}
            />
            <div>
              <p>
                {p.products.name} x<span>{p.quantity}</span>
              </p>
              <p>{FormatCurrency(Number(p.total_price))}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
