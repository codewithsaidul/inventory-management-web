export  const handleNumberChange = (value: string, setter: (val: string) => void) => {
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

export  const handlePriceChange = (value: string, setter: (val: string) => void) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };