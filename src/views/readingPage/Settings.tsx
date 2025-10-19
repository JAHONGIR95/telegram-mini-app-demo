import CRange from "@/components/range";
import { useReaderSettingsStore } from "@/store/useReaderSettingStore";

const SettingsView = () => {
  const { fontSize, setFontSize } = useReaderSettingsStore();

  console.log(fontSize);
  return (
    <>
      <h2 className="text-sm leading-4 mb-5 font-extrabold font-primaryColor text-center">
        Настройки
      </h2>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="">Межстрочный интервал:</p>
          <p className="">action</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="">Межстрочный интервал:</p>
          <p className="">action</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="">Размер шрифта:</p>
          <div className="flex items-center gap-4">
            <CRange max={24} min={12} value={fontSize} onChange={setFontSize} />
            <p className="">{fontSize}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="">Межстрочный интервал:</p>
          <p className="">action</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="">Межстрочный интервал:</p>
          <p className="">action</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="">Межстрочный интервал:</p>
          <p className="">action</p>
        </div>
      </div>
    </>
  );
};

export default SettingsView;
