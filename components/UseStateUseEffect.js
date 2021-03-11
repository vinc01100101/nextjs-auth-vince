import { useState, useEffect } from "react";

const UseStateUseEffect = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };
  const decrement = () => {
    setCount((prevCount) => {
      return prevCount - 1;
    });
  };

  /*
    useEffect(callback,targetsArray)
    @params callback {function} method to be invoked each call
    @params targetsArray {array} array of variables to listen for changes when running useEffect

    useEffect will always trigger after mounting the component (componentDidMount)
    useEffect will trigger on each render if targetsArray is not defined (componentDidUpdate)
    however, it will be prevented by passing an empty targetsArray or [] (componentDidMount only)
    useEffect will only trigger when target variables have changed (conditional componentDidUpdate optimization)
    
  */
  useEffect(() => {
    document.title = count;
  });

  return (
    <div>
      <h3>A component that changes the title</h3>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </div>
  );
};

export default UseStateUseEffect;
