import "../styles/Input.css";

function Input({ id, name, placeholder, img, type, alt, handleChange }) {
  return (
    <div className="input">
      {/* <div className='input-image'> */}
      <img src={img} alt={alt} />
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={(e) => handleChange(e)}
        required
      />
    </div>
  );
}

export default Input;
