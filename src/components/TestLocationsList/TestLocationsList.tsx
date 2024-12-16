import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import TestLocationForm from "../TestLocationForm/TestLocationForm";
import { toJS } from "mobx";

import { storeContext } from "../../store";

import "./style.css";

const TestLocationsList = observer(() => {
  const store = useContext(storeContext);

  const [locationsList, setLocationsList] = useState([{}]);

  return (
    <>
      {locationsList.map((location, index) => (
        <TestLocationForm key={`location-${index}`} />
      ))}

      <div className="buttons">
        <button
          onClick={() => {
            console.log(toJS(store.locations));
          }}
        >
          Вывести результат в консоль
        </button>
        <button
          className="add-button"
          onClick={() => {
            store.addLocation({
              locationID: Date.now(),
              name: "",
              comment: "",
              env: "",
            });
          }}
        >
          <img
            className="add-button-img"
            src="assets/plus-solid.svg"
            alt="plus-solid.svg"
          />
          <span style={{ color: "74c0fc" }}>Добавить тестовую локацию...</span>
        </button>
      </div>
    </>
  );
});

export default TestLocationsList;
