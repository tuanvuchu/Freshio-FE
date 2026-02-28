"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import Image from "next/image";
import { FormatCurrency } from "@/hooks/format-currency";
import ProductForm from "./product-form";

export type Product = {
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
const infoKeyMap: Record<string, string> = {
  weight: "Khối lượng",
  color: "Màu sắc",
  size: "Kích thước",
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const image = row.getValue<string>("image");
      return (
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
            alt="Hình ảnh"
            width={50}
            height={50}
            priority
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      return (
        <div>
          {FormatCurrency(row.original.price)}/{row.original.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "additional_information",
    header: "Thông tin bổ sung",
    cell: ({ row }) => {
      const info = row.original.additional_information;
      if (!info || typeof info !== "object") return "-";

      return (
        <div className="space-y-1">
          {Object.entries(info).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium">{infoKeyMap[key] || key}: </span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sửa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <ProductForm
                url={`${process.env.NEXT_PUBLIC_API_URL}/products/update/${product.id}`}
                product={product}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="ml-5" variant="destructive">
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/products/delete/${product.id}`,
                        {
                          method: "delete",
                        },
                      );
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Ok
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
