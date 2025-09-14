import { useSafeAreaBottom } from "@/components/App";
import Button from "@/components/buttons/Button";
import Header from "@/components/Header";
import ImageFileInput from "@/components/imageInput";
import SortButtons from "@/components/sort";
import Toggle from "@/components/toggle";
import clsx from "clsx";
import { useState } from "react";

const Settings = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [activeSort, setActiveSort] = useState("light");
  const { safeAreaBottom } = useSafeAreaBottom();

  const data = [
    { label: "Светлая", value: "light" },
    { label: "Тёмная", value: "dark" },
    { label: "Как в системе", value: "system" },
  ];
  return (
    <div className="h-screen flex flex-col bg-globe">
      <Header>
        <p className="main_heading pb-4">Настройки</p>
      </Header>

      <form
        className="px-3 pt-3 overflow-y-auto" style={{ paddingBottom: safeAreaBottom + 100 }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log("Toggle holati:", formData.get("notifications"));
        }}
      >
        <p className="text-tertiary font-bold leading-2 text-xs py-2.5 tracking-wide mb-6">
          Настройка профиля
        </p>
        <div className="flex justify-between gap-4 mb-6">
          <div className="flex flex-col gap-2 max-w-[200px]">
            <p className="text-[#AFAFAF] font-normal leading-2 text-[10px] pl-4">
              Имя
            </p>
            <div className="mb-4 flex w-full items-center justify-between border-b-2 border-b-inputDefault">
              <input
                type="text"
                placeholder="Имя"
                value="Илон Маск"
                className="text-sm font-semibold leading-3 font-inter text-black outline-none bg-transparent p-2 flex-1"
                //   onChange={(e) => setSearch(e.target.value)}
              />
              <span className="icon editable_pen_icon" />
            </div>
            <label className="floating-label">
              <textarea
                className="border-[1.5px] border-inputDefault rounded-xl p-2 text-[10px] text-inputDefault outline-none w-full"
                placeholder="Введите текст"
                rows={4}
              />
              <span className="!bg-globe">О себе</span>
            </label>

            <div className="flex gap-2">
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-[#AFAFAF] font-bold leading-2 text-[10px]">
                  дата рождения
                </p>
                <input
                  type="date"
                  className="w-full appearance-none border-[1.5px] border-inputDefault rounded-xl p-2.5 text-[10px] text-black font-semibold outline-none bg-transparent focus:outline-none custom-select"
                  name="birthdate"
                  id="birthdate"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-[#AFAFAF] font-bold leading-2 text-[10px]">
                  пол
                </p>
                <select
                  defaultValue="Pick a color"
                  className="appearance-none select border-[1.5px] border-inputDefault rounded-xl p-2.5 text-[10px] text-black font-semibold outline-none bg-transparent focus:outline-none custom-select"
                  name="gender"
                  id="gender"
                >
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
              </div>
            </div>
          </div>
          <ImageFileInput
            value={avatar}
            onChange={setAvatar}
            height={180}
            placeholder="Avatar yuklang yoki tashlang"
          />
        </div>

        <p className="text-tertiary font-bold leading-2 text-xs py-2.5 tracking-wide mb-4">
          Настройка уведомлений
        </p>
        <div className="flex justify-between items-center ">
          <p className="font-nunito font-extrabold leading-2 text-[10px]">
            Присылать уведомления через телеграм бот:
          </p>
          <Toggle name="notifications" checked={true} />
        </div>
        <div className="divider before:bg-secondaryDefault after:bg-secondaryDefault my-2" />

        <div className="flex justify-between items-center ">
          <p className="font-nunito font-extrabold leading-2 text-[10px]">
            Уведомления от вашего смысла
          </p>
          <Toggle name="notifications" checked={true} />
        </div>
        <div className="divider before:bg-secondaryDefault after:bg-secondaryDefault my-2" />

        <div className="flex justify-between items-center ">
          <p className="font-nunito font-extrabold leading-2 text-[10px]">
            Уведомления от других пользователей
          </p>
          <Toggle name="notifications" checked={true} />
        </div>
        <div className="divider before:bg-secondaryDefault after:bg-secondaryDefault my-2" />

        <div className="flex justify-between items-center ">
          <p className="font-nunito font-extrabold leading-2 text-[10px]">
            Уведомления от фрагментов
          </p>
          <Toggle name="notifications" checked={true} />
        </div>
        <div className="divider before:bg-secondaryDefault after:bg-secondaryDefault my-2" />

        <p className="text-tertiary font-bold leading-2 text-xs py-2.5 tracking-wide my-6">
          Настройка темы
        </p>

        <SortButtons
          data={data}
          renderItem={({ label, value }: { label: string; value: string }) => (
            <Button
              variant="ghost"
              className={clsx(
                "rounded-lg p-2.5 text-[#1E1D1E]",
                value === activeSort
                  ? "!bg-white text-xs/3 font-bold border-2 border-white"
                  : "bg-transparent border-2 border-white text-xs/3 font-medium"
              )}
              onClick={() => setActiveSort(value)}
            >
              <div className="flex items-center gap-5">
                {label}
                <input
                  type="checkbox"
                  checked={value === activeSort}
                  className="checkbox checkbox-md rounded-full border-2 border-white checked:bg-link checked:text-white checked:border-transparent"
                />
              </div>
            </Button>
          )}
        />

        <a
          href="#"
          className="text-sm font-bold font-inter leading-3 text-[#484848] mt-6 inline-block underline decoration-[#484848] underline-offset-4"
        >
          Политика конфиденциальности
        </a>
      </form>
    </div>
  );
};

export default Settings;
