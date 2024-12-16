import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { storeContext } from "../../store";
import "./style.css";
import FormComponent from "../FormComponent/FormComponent";

interface LocationData {
  locationID: number;
  name: string;
  comment?: string;
  env?: string;
}

interface TestLocationFormProps {}

const TestLocationForm: React.FC<TestLocationFormProps> = observer(() => {
  const store = useContext(storeContext);

  useEffect(() => {
    store.fetchData();
  }, [store]);

  if (store.isLoading) {
    return <div>Данные загружаются...</div>;
  }

  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }

  const onSubmit = (data: LocationData) => {
    console.log("onSubmit", data);
    store.addLocation(data); 
  };

  const onDelete = (locationID: number) => {
    store.removeLocation(locationID); 
  };

  return (
    <>
      {store.locations.map((location: LocationData, index: number) => (
        <div className="card" key={index}>
          <div className="card-head">
            <div className="card-head-left">
              <img src="assets/vial-solid.svg" alt="vial-solid" />
              <h2>{location.name}</h2>
            </div>

            <button onClick={() => onDelete(location.locationID)}>
              <img src="assets/trash-solid.svg" alt="trash" />
            </button>
          </div>

          <div className="card-body"></div>

          <FormComponent
            onSubmit={onSubmit}
            location={location.name}
            commentForm={location.comment || ""}
            env={location.env || ""}
          />
        </div>
      ))}
    </>
  );
});

export default TestLocationForm;
