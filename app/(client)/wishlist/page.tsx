import BreadcrumbComponent from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

export default function Wishlist() {
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Danh sách yêu thích"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh sách yêu thích" },
        ]}
      />
      <div className="mx-5 pb-15">
        Không có sản phẩm nào trong danh sách yêu thích!
      </div>
      {/* <Table className="m-5 w-auto ">
        <TableBody>
          <TableRow data-id="hihi">
            <TableCell className="border">
              <span className="freshio-icon-times hover:cursor-pointer"></span>
            </TableCell>
            <TableCell className="border">
              <Link href="/">
                <Image
                  src="/images/test.jpg"
                  width="100"
                  height="100"
                  alt="fff"
                />
              </Link>
            </TableCell>
            <TableCell className="w-3xl border">
              <div>
                <Link
                  href="/"
                  className=" text-yellow-500 hover:text-yellow-600"
                >
                  dsfsdfsdfd
                </Link>
                <p className="py-1.5">99999</p>
                <p>ngay them</p>
              </div>
            </TableCell>
            <TableCell className="border ">
              <Button
                variant="ghost"
                className="bg-yellow-600 text-white hover:bg-yellow-700 hover:text-white hover:cursor-pointer h-12"
              >
                Thêm vào giỏ hàng
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </>
  );
}
