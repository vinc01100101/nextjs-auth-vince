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
    useEffect(callback,statesArray)
    @params callback {function} method to be invoked each call
    @params statesArray {array} state variables to listen to in order to run useEffect

    useEffect will always trigger after mounting the component (componentDidMount)
    useEffect will trigger on each render if statesArray is not defined (componentDidUpdate)
    however, it will be prevented by passing an empty statesArray or [] (componentDidMount only)
    useEffect will only trigger when state variables that are defined inside statesArray changed (conditional componentDidUpdate optimization)
    
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
