import { Button } from "@mantine/core";
import { useServerSideQuery } from "rakkasjs";
import { Suspense } from "react";

export default function BrawlersPage() {
  return (
    <div>
      <h1>Brawlers!</h1>
      <Button>Hi</Button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLoaded />
      </Suspense>
    </div>
  );
}

function LazyLoaded() {
  const query = useServerSideQuery(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 1 + 1;
  });

  return <div>{query.data}</div>;
}
