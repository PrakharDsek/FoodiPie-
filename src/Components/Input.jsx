import styled from "styled-components";

const Input = ({
  placeholder,
  type,
  disabled,
  style,
  ref,
  onChangeHandler,
  onChangeVal,
  min,
  max,
  value,
  changeHandler,
}) => {
  return (
    <Container>
      <div className="input-container">
        <input
          ref={ref}
          onChange={(e) =>
            onChangeHandler((prev) => ({
              ...prev,
              [onChangeVal ? onChangeVal :placeholder]: e.target.value,
            }))
          }
          value={value}
          style={style}
          disabled={disabled}
          required
          placeholder={placeholder}
          className="input-field"
          type={type}
        />
        <label htmlFor="input-field" className="input-label">
          {placeholder}
        </label>
        <span className="input-highlight"></span>
      </div>
    </Container>
  );
};

export default Input;

const Container = styled.div`
  .input-container {
    position: relative;
    margin: 20px;
  }

  /* Input field */
  .input-field {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    background-color: transparent;
    font-family: var(--sans-font);
  }

  /* Input label */
  .input-label {
    font-family: var(--sans-font);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    color: rgba(204, 204, 204, 0);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  /* Input highlight */
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: var(--theme);
    transition: all 0.3s ease;
  }

  /* Input field:focus styles */
  .input-field:focus + .input-label {
    top: -20px;
    font-size: 12px;
    color: var(--theme);
  }

  .input-field:focus + .input-label + .input-highlight {
    width: 100%;
  }
`;
