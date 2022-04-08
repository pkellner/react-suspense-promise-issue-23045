import useSwr from "swr";
import { restBase } from "../constants";
import { Suspense } from "react";
import { fetcher } from "../fetcher";

export default function CityDetail({ selectedCityId, cities, isPending }) {
  const selectedCityIdLocal = selectedCityId
    ? selectedCityId
    : cities && !selectedCityId
    ? cities[0].id
    : undefined;

  const { data: city } = useSwr(
    `${restBase}/api/city/${selectedCityIdLocal}`,
    fetcher,
    { suspense: true }
  );

  return (
    <div className="row">
      <div className="col-9">
        {isPending ? (
          <div>Loading because of isPending set</div>
        ) : (
          <Suspense fallback={<div>City DETAIL</div>}>
            <div>{JSON.stringify(city ?? "{id: 99999}")}</div>
          </Suspense>
        )}
      </div>
    </div>
  );
}
