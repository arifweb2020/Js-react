<input type="tel" onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />


// 2nd way

const [age, setAge] = useState();

const handleChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  setAge(value);
};

return (
  <div>
    <input value={age} onChange={handleChange} />
  </div>
);
