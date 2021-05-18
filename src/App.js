import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

const suggestElems = [
  { id: 1, value: "abc" },
  { id: 2, value: "abcdef" },
  { id: 3, value: "abcdefghi" },
  { id: 4, value: "abcdefghijkl" }
];

String.prototype.startsWith = function (subsStr) {
  if (!this.length) return false;

  for (let i = 0; i < subsStr.length; i++) {
    if (this[i] !== subsStr[i]) {
      return false;
    }
  }

  return true;
};

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestArray, setSuggestArray] = useState([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const suggestRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsSuggestOpen(!!suggestArray.length);
  }, [suggestArray]);

  const onOutsideClick = useCallback((event) => {
    if (suggestRef?.current?.contains(event.target)) return;
    if (inputRef?.current?.contains(event.target)) return;
    setIsSuggestOpen(false);
  }, []);

  const onUlClick = (event) => {
    if (event.target?.id) {
      const targetElemValue = suggestElems.find(
        ({ id }) => id.toString() === event.target?.id
      );
      setInputValue(targetElemValue.value);
      setIsSuggestOpen(false);
    }
  };

  const onInputChange = (event) => {
    const inputElementValue = event.target.value;
    setInputValue(inputElementValue);
    setSuggestArray(
      !inputElementValue
        ? []
        : suggestElems.filter(({ value }) =>
            value.startsWith(inputElementValue?.toLowerCase())
          )
    );
  };

  return (
    <div className="App" onClick={onOutsideClick}>
      <input ref={inputRef} onChange={onInputChange} value={inputValue} />
      {isSuggestOpen && (
        <ul ref={suggestRef} onClick={onUlClick}>
          {suggestArray.map(({ id, value }) => (
            <li id={id} key={id}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
