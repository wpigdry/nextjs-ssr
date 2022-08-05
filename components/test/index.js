let myData = {};
let promise = {};

const SuspenseComponent = ({ value }) => {
  const waitForData = () => {
    if (myData[value] !== undefined) return myData[value];

    if (!promise[value])
      promise[value] = fetch(
        "http://127.0.0.1:8088"
      )
        .then((res) => {console.log(res, 11111111111, res.json()); return res})
        .then((d) => {console.log(d, '222222222'); return (myData[value] = d)});
    throw promise[value];
  };

  const data = waitForData();

  console.log(data, 333333333);

  return (
    <div className="w-full  flex justify-center items-center h-screen">
      {data.title || "Hello Ali"}
    </div>
  );
};

export default SuspenseComponent;
