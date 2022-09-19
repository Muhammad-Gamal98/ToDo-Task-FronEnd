const Select = (props) => {
  return (
    <>
      <label htmlFor="select">{props.title}</label>
      <select
        defaultValue={`${props.message ? props.message : props.value}`}
        id="select"
        className={`form-select ${props.error && "is-invalid"}`}
        aria-label="Default select example"
        onChange={props.onChange}
        onBlur={props.onBlur}
        required
      >
        <option disabled>{props.message}</option>
        {props.options &&
          props.options.map((el, index) => {
            return (
              <option key={index} value={el.value}>
                {el.text}
              </option>
            );
          })}
      </select>
      {props.error && (
        <div className="invalid-feedback">{props.errorMessage}</div>
      )}
    </>
  );
};
export default Select;
