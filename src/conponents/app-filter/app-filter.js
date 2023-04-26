import "./app-filter.css"

const AppFilter = (props) => {
  const buttonsData = [
    { name: "all", label: "Все сотрудники" },
    { name: "rise", label: "На повышение" },
    { name: "more1000$", label: "З/П больше 1000$" },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = name === props.filter;
    const clazz = active ? "btn-light" : "btn btn-outline-light";

    return (
      <button
        className={`btn ${clazz}`}
        type="button"
        key={name}
        onClick={() => {
          props.onFilterEmp(name);
        }}
      >
        {label}
      </button>
    );
  });

  return <div className="app-filter">{buttons}</div>;
};

export default AppFilter;