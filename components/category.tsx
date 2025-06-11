import { Separator } from "@/components/ui/separator";
import slug from "@/hooks/slug";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type CategoryData = {
  name: string;
  count: number;
};

type Category = {
  url: string;
  title: string;
};

async function getCategories(): Promise<CategoryData[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/categories`
    );
    const data: CategoryData[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function BlogCategory({ title, url }: Category) {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    load();
  }, []);

  return (
    <div className="my-10">
      <p className="text-[#0a472e] font-bold">{title}</p>
      <Separator className="my-5" />
      <ul className="space-y-3">
        {categories.map((p) => (
          <li key={p.name}>
            <Link href={`${url}/${slug(p.name)}`} className="flex items-center">
              <div className="flex items-center gap-1">
                <ChevronRight className="size-4" />
                <p className="hover:text-[#80891b]">{p.name}</p>
                <p className="text-[#999999]"> ({p.count})</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
