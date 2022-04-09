import { Suspense } from "react";
import useSwr from "swr";
import { restBase } from "../constants";
import { fetcher } from "../fetcher";

export default function CityDetail({ selectedCityId, isPending, cities }) {
  const selectedCityIdLocal = selectedCityId
    ? selectedCityId
    : cities && !selectedCityId
    ? cities[0].id
    : undefined;

  const url = `${restBase}/api/city/${selectedCityIdLocal}`;

  const { data: city } = useSwr(url, fetcher, { suspense: true });

  return isPending ? (
    <div className="col-9">City Detail Loading...</div>
  ) : (
    <div className="col-9">
      <Suspense fallback={<div>City DETAIL</div>}>
        <div>{JSON.stringify(city)}</div>
      </Suspense>
    </div>
  );
}
