import useSwr from "swr";
import { restBase } from "../constants";
import { Suspense, useState, useTransition } from "react";
import CityDetail from "./CityDetail";
import { fetcher } from "../fetcher";

export default function CityList() {
  const { data: cities } = useSwr(`${restBase}/api/city`, fetcher, {
    suspense: true,
  });

  const [selectedCityId, setSelectedCityId] = useState();
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense fallback={<div>Loading CityShowData...</div>}>
      <div className="row">
        <div className="col-3">
          {cities.map((city) => {
            return (
              <div key={city.id}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("onClick");
                    startTransition(() => {
                      console.log("startTransition");
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
        <div className="col-9">
          <div>
            <CityDetail
              selectedCityId={selectedCityId}
              cities={cities}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
