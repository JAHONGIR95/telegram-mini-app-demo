import human from "@/assets/images/human.webp";
import topIcon from "@/assets/icons/top-icon.svg";
import goToBookIcon from "@/assets/icons/go-to-book-icon.svg";
import commentIcon from "@/assets/icons/comment-icon-2.svg";
import shareIcon from "@/assets/icons/share-icon.svg";
import bookmarkIcon from "@/assets/icons/bookmark-icon.svg";
import FullTextCollapse from "../expandableText";

export default function PostCard() {
  return (
    <div className="rounded-2xl shadow-xl p-1 mb-5 bg-white ">
      {/* Автор */}
      <div className="bg-[#f5f5f5] rounded-2xl p-3">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={human}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <div className="font-semibold">Сергей Александрович</div>
              <div className="text-xs text-gray-500">5 мая</div>
            </div>
          </div>
          <span className="text-gray-400 font-extrabold">⋮</span>
        </div>

        <FullTextCollapse>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          recusandae architecto sunt officiis hic veniam molestiae ratione
          reiciendis accusamus doloremque ipsam impedit, nam culpa facilis
          libero aperiam qui possimus quo perferendis quos consequatur quae modi
          et! Veritatis, laboriosam quibusdam! Accusantium praesentium aperiam
          sapiente asperiores optio temporibus impedit ullam assumenda hic!
        </FullTextCollapse>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-[#6b6b6b]">
            Мастер и Маргарита
          </span>
          <img
            src={goToBookIcon}
            alt="icon"
            loading="lazy"
            className="w-6 h-6"
          />
        </div>

        <div className="bg-white rounded-2xl -mx-3 -mb-3 mt-3 pb-3">
          <div className="rounded-xl p-3 overflow-hidden relative ">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Раскрывает смысл</span>
              <span>#Tag</span>
            </div>

            <p className="text-sm font-medium text-gray-900 mt-1 leading-4">
              Но тебе придется примириться с этим, – возразил Воланд, и усмешка
              искривила его рот Но тебе придется примириться
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-13 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          </div>

          <div className="border-b-1 border-[#bdbdbd] mx-3"></div>

          <div className="flex items-center mt-4 px-3 gap-5">
            <div className="flex items-center text-orange-500 font-semibold gap-2">
              <img src={topIcon} alt="top" className="w-6" loading="lazy" />
              <span>46</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <img
                src={commentIcon}
                className="w-6"
                alt="comments"
                loading="lazy"
              />
              <span>3</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <img
                src={shareIcon}
                className="w-6 h-6"
                alt="comments"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-2 text-gray-600 font-semibold ml-auto">
              <img
                src={bookmarkIcon}
                className="w-6 h-6"
                alt="comments"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
