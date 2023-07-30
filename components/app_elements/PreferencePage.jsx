import CustomSelect from "@/components/ui_elements/CustomSelect";
import utilityStyles from "@/styles/utils/utilities.module.css";
import { useEffect, useState } from "react";

const PreferencePage = ({
  setPreferences,
  optionArr,
  property,
  header,
  selectedOptions,
  numOptionsToSelect,
}) => {
  const [optionsSelected, setOptionsSelected] = useState([]);

  const addTag = (e) => {
    const value = e.target.innerText;
    if (numOptionsToSelect) {
      if (
        !optionsSelected.includes(value) &&
        optionsSelected.length < numOptionsToSelect
      ) {
        setOptionsSelected([...optionsSelected, value]);
        setPreferences((prevState) => ({
          ...prevState,
          [property]: [...optionsSelected, value],
        }));
      } else {
        let newOptions = optionsSelected.filter((element) => element != value);
        setOptionsSelected(newOptions);
        setPreferences((prevState) => ({
          ...prevState,
          [property]: newOptions,
        }));
      }
    } else {
      if (!optionsSelected.includes(value)) {
        setOptionsSelected([...optionsSelected, value]);
        setPreferences((prevState) => ({
          ...prevState,
          [property]: [...optionsSelected, value],
        }));
      } else {
        let newOptions = optionsSelected.filter((element) => element != value);
        setOptionsSelected(newOptions);
        setPreferences((prevState) => ({
          ...prevState,
          [property]: newOptions,
        }));
      }
    }
  };

  useEffect(() => {
    if (selectedOptions?.length) {
      setOptionsSelected(selectedOptions);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <span
        className={utilityStyles.heading3}
        style={{ margin: ".5rem 0", textAlign: "center" }}
      >
        {header}
      </span>
      {numOptionsToSelect ? (
        <small style={{ textAlign: "center" }}>
          Select up to {numOptionsToSelect} options
        </small>
      ) : null}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <CustomSelect
          name={`select${property}`}
          title={`Search ${property}`}
          onChangeHandler={addTag}
          options={optionArr}
          isSearch
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        {optionArr.slice(0, 10).map((element, idx) => {
          return (
            <div
              key={`option${idx}`}
              className={utilityStyles.tab}
              style={{
                margin: ".25rem .25rem 0 0",
                fontSize: "14px",
                borderColor: optionsSelected.includes(element)
                  ? "var(--purple)"
                  : "var(--border-grey)",
                backgroundColor:
                  numOptionsToSelect &&
                  optionsSelected.length == numOptionsToSelect
                    ? "var(--grey)"
                    : "#fff",
                color: optionsSelected.includes(element)
                  ? "var(--purple)"
                  : "#000",
              }}
              onClick={addTag}
            >
              {element}
            </div>
          );
        })}
        {optionsSelected.map((element, idx) => {
          return !optionArr.slice(0, 10).includes(element) ? (
            <div
              key={`option${idx}`}
              className={utilityStyles.tab}
              style={{
                margin: ".25rem .25rem 0 0",
                borderColor: "var(--color-5)",
                color: "var(--color-5)",
                fontSize: "14px",
                borderWidth: "2px",
              }}
              onClick={addTag}
            >
              {element}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default PreferencePage;
