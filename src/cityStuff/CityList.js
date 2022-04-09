import { Suspense, useState, useTransition } from "react";
import useSwr from "swr";
import { restBase } from "../constants";
import { fetcher } from "../fetcher";
import CityDetail from "./CityDetail";

export default function CityList() {
  const [selectedCityId, setSelectedCityId] = useState();
  const [isPending, startTransition] = useTransition();

  const { data: cities } = useSwr(`${restBase}/api/city`, fetcher, {
    suspense: true,
  });

  return (
    <Suspense fallback={<div>Loading CityShowData...</div>}>
      <div className="col-3">
        {cities.map((city) => {
          return (
            <div key={city.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    setSelectedCityId(city.id);
                  });
                }}
              >
                {city.city}
              </button>
            </div>
          );
        })}
      </div>
      <CityDetail
        selectedCityId={selectedCityId}
        isPending={isPending}
        cities={cities}
      />
    </Suspense>
  );
}
