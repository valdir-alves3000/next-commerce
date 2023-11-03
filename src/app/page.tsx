import { InfiniteScroll } from "@/app/components/InfiniteScroll";
import { fetchProducts } from "./actions";

export default async function Home() {
  const { formatedProducts } = await fetchProducts({});

  return (
    <div className="max-w-7xl mx-auto pt-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        <InfiniteScroll initialProducts={formatedProducts} />
      </div>
    </div>
  );
}
