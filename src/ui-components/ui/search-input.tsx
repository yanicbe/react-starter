import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchInput = ({
  setSearchText,
  searchText,
}: {
  setSearchText: (text?: string) => void;
  searchText?: string;
}) => {
  const [gotAnInput, setGotAnInput] = useState(false);
  const [inputText, setInputText] = useState(searchText || "");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (inputText.length <= 3) {
      if (inputText.length === 0) {
        setSearchText(undefined);
        setShowText(false);
      } else {
        const timer = setTimeout(() => {
          setShowText(true);
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }
    const timer = setTimeout(() => {
      setSearchText(inputText);
    }, 500);

    setShowText(false);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gotAnInput]);

  return (
    <div className="min-w-40">
      <div className="flex gap-3 bg-white items-center rounded-2xl px-3 py-2 shadow-sm text-[#888] text-sm">
        <Search />
        <input
          placeholder="Suchen..."
          className="border-none outline-none w-full"
          onChange={(e) => {
            setGotAnInput((prev) => !prev);
            setInputText(e.target.value);
          }}
          value={inputText}
        />
      </div>
      {showText && <p className="text-sm absolute text-red-500">Gib mindestens 4 Zeichen ein</p>}
    </div>
  );
};

export default SearchInput;
