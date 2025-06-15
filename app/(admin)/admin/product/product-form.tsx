"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ProductFormProps = {
  url: string;
  product?: {
    id: string;
    image: string;
    name: string;
    description: string;
    additional_information: {
      weight: string;
    };
    price: number;
    unit: string;
    quantity: number;
  };
};

type ProductFormValues = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  weight: string;
  image: string;
};

export default function ProductForm({ url, product }: ProductFormProps) {
  const { accessToken } = useUser();

  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const form = useForm<ProductFormValues>({
    defaultValues: {
      id: product?.id ?? "",
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      unit: product?.unit ?? "",
      quantity: product?.quantity ?? 0,
      weight: product?.additional_information?.weight ?? "",
      image: product?.image ?? "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      form.reset();
      toast("Thành công");
      const result = await res.json();
      if (url.includes("/create")) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag_id: "c6b188d3-1de9-48ac-8a5b-537cbb37dd95",
            product_id: result.id,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Input
            className="mr-5"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/users/upload`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const result = await res.json();
                setImageUrl(result.filePath);
                form.setValue("image", result.filePath);
              } catch (error) {
                console.error(error);
              }
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
                alt="Preview"
                width={50}
                height={50}
                className="object-cover border"
              />
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea className="max-h-[20px] overflow-y-auto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2.5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đơn vị</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng</FormLabel>
              <FormControl>
                <Input min={0} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Khối lượng</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </Form>
  );
}
