import Loader from "@/components/Loader";
import ResponseCard from "@/components/responseCard";
import { useEffect, useState } from "react";

const Connections = () => {
  const [isLoading, setIsLoading] = useState(!false);

  const responses = [
    { id: 1, title: "Response 1" },
    { id: 2, title: "Response 2" },
    { id: 3, title: "Response 3" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {responses.map((response) => (
        <ResponseCard
          key={response.id}
          header={() => (
            <p className="text-base leading-3.5 font-extrabold text-tertiary mb-4">
              Мастер и Маргарита
            </p>
          )}
        >
          “Мы говорим с тобой на разных языках, как всегда, - отозвался Воланд,
          - но вещи, о которых мы говорим, от этого не меняются.”“Мы говорим с
          тобой на разных языках, как всегда, - отозвался Воланд, - но вещи, о
          которых мы говорим, от этого не меняются.”“Мы говорим с тобой на
          разных языках, как всегда, - отозвался Воланд, - но вещи, о которых мы
          говорим, от этого не меняются.”
        </ResponseCard>
      ))}
    </>
  );
};

export default Connections;
