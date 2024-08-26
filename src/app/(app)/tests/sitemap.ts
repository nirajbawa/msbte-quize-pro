import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { MetadataRoute } from "next";

const fetchData = async (
  pageNo: number,
  limit: number
): Promise<ApiResponse> => {
  const res = await axios.get(
    `${process.env.BASE_URL}/api/test?page=${pageNo}&limit=${limit}`
  );
  return res.data;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tests: any[] = [];

  let data = await fetchData(1, 10);

  data.data.data.forEach((item: any) =>
    tests.push({
      url: `/cart/checkout?id=${item._id}`,
      lastModified: item.updatedAt,
    })
  );

  console.log(tests);

  if (data.data.totalPages > data.data.currentPage) {
    for (let i = data.data.currentPage + 1; i <= data.data.totalPages; i++) {
      data = await fetchData(i, 10);
      tests.concat(
        data.data.data.forEach((item: any) =>
          tests.push({
            url: `/cart/checkout?id=${item._id}`,
            lastModified: item.updatedAt,
          })
        )
      );
    }
  }

  return [...tests];
}
