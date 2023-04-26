import "./app-info.css";

const AppInfo = (props) => {
  const { numberOfEmpoyees, numberOfIncrease } = props;

  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании</h1>
      <h2>Общее число сотрудников: {numberOfEmpoyees}</h2>
      <h2>Премию получат: {numberOfIncrease}</h2>
    </div>
  );
};

export default AppInfo;
