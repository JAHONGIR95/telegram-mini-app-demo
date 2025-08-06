import Loader from "@/components/Loader";
import ResponseCard from "@/components/responseCard";
import  { useEffect, useState } from "react";

const ResponseView = () => {
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
    <div>
      {responses.map((response) => (
        <ResponseCard key={response.id} />
      ))}
    </div>
  );
};

export default ResponseView;
