import { chapters } from "@/utils/constantValues";

const Chapters = () => {
  
  return (
    <div className="flex-1 px-4 space-y-2.5 overflow-y-auto">
      {chapters.map((chapter) => (
        <p
          key={chapter.id}
          className="text-justify font-medium text-black text-xs"
        >
          <span className="w-1 h-1 bg-black inline-block mr-2 rounded-full align-middle" />{" "}
          {chapter.title}
        </p>
      ))}
    </div>
  );
};

export default Chapters;
