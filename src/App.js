import { useState, Suspense, useTransition } from "react";
import useSwr from "swr";
import { restBase } from "./constants";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function CityDetail({ selectedCityId, cities, isPending }) {
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

function CityList() {
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

function CityHeader() {
  return (
    <div className="row">
      <div className="col-3">
        <b>CITY LIST</b>
        <hr />
      </div>
      <div className="col-9">
        <div>
          <b>CITY DETAIL</b>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <a href="/">Site Root</a>
      <hr />
      <CityHeader />
      <CityList />
    </div>
  );
}
