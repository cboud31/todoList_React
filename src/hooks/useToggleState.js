import { useState } from 'react';

const useToggle = (initVal) => {
  const [state, setState] = useState(initVal);

  const toggle = () => {
    setState(!state);
  };
  return [state, toggle];
};

export default useToggle;
