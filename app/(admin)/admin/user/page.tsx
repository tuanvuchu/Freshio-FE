"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(accessToken: string): Promise<User[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/get-all`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function User() {
  const { accessToken } = useUser();
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(accessToken);
      setData(result);
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
