import { useRef, useEffect } from "react";

const usePrevious = (value) => {
    // The ref object will hold the value
    const ref = useRef();
    
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]);
    
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

export default usePrevious