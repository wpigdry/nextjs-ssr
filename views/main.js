// import Spinner from "../components/spinner";
import { Suspense, SuspenseList } from "react";
import { lazy } from "react";

import { useRouter } from "next/router";

const SuspenseComponent = lazy(() => import("../components/test"));

export default function Home() {
  const { query: queryParams } = useRouter();

  const first = queryParams.first != undefined ? queryParams.first : 1;

  const second = queryParams.second != undefined ? queryParams.second : 2;
  return (
    <SuspenseList>
      <Suspense fallback={<div>loading...</div>}>
        {/* A component that uses Suspense-based */}
        <SuspenseComponent value={first} />
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        {/* A component that uses Suspense-based */}
        <SuspenseComponent value={second} />
      </Suspense>
    </SuspenseList>
  );
}
