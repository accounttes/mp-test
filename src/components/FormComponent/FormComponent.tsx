import React, { useEffect, useState } from "react";
import "./style.css";

const Icon: React.FC<{ icon: string; className?: string }> = ({ icon }) => (
  <span style={{ color: "black", marginRight: "8px" }}>{icon}</span>
);

interface FormComponentProps {
  onSubmit: (data: FormData) => void;
  location: string;
  commentForm: string;
  env: string;
}

interface FormData {
  locationID: number;
  name: string;
  comment?: string;
  env?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  onSubmit,
  location,
  commentForm,
  env,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedEnv, setSelectedEnv] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const [showEnvDropdown, setShowEnvDropdown] = useState<boolean>(false);

  const locations: string[] = ["Локация 1", "Локация 2", "Локация 3"];
  const envs: string[] = ["Среда 1", "Среда 2", "Среда 3"];
  const servers: string[] = ["Сервер 1", "Сервер 2", "Сервер 3"];

  const isFilled =
    selectedLocation.length > 0 && selectedEnv.length > 0 && comment.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    const locationID = locations.indexOf(selectedLocation); 
    if (locationID >= 0) {
      onSubmit({
        locationID,
        name: selectedLocation,
        comment,
        env: selectedEnv,
      });

      
      setSelectedLocation("");
      setSelectedEnv("");
      setComment("");
    } else {
      alert("Пожалуйста, выберите локацию.");
    }
  };

  useEffect(() => {
    setSelectedLocation(location);
    setComment(commentForm);
    setSelectedEnv(env);
  }, []);

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <div className="form-label">
            <Icon icon="⚫" />
            <label className="label">Локация:</label>
          </div>
          <div className="custom-select">
            <div
              className="select-visible"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              {selectedLocation || "Выберите локацию"}
              <Icon icon={showLocationDropdown ? "▲" : "▼"} />
            </div>
            {showLocationDropdown && (
              <div className="dropdown">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationDropdown(false);
                    }}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="form-label">
            <Icon icon="⚫" />
            <label className="label">Среда:</label>
          </div>
          <div className="custom-select">
            <div
              className="select-visible"
              onClick={() => setShowEnvDropdown(!showEnvDropdown)}
            >
              {selectedEnv || "Выберите среду"}
              <Icon icon={showEnvDropdown ? "▲" : "▼"} />
            </div>
            {showEnvDropdown && (
              <div className="dropdown">
                {envs.map((env, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedEnv(env);
                      setShowEnvDropdown(false);
                    }}
                  >
                    {env}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="form-label">
            <Icon icon="⚫" />
            <label className="label">Серверы:</label>
          </div>
          <span>{servers.join(", ")}</span>
        </div>

        <div className="form-group">
          <div className="form-label">
            <Icon icon="⚫" />
            <label htmlFor="comment" className="label">
              Подсказка:
            </label>
          </div>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Введите комментарий"
            rows={4}
            className="textarea"
          />
        </div>
      </div>

      {isFilled && (
        <button type="submit" className="button">
          Добавить
        </button>
      )}
    </form>
  );
};

export default FormComponent;
