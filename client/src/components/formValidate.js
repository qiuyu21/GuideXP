export default function FormValidateHelper(Joi, definitions) {
  function validateAll(data) {
    const schema = Joi.object(definitions);
    const result = schema.validate(data, { abortEarly: false });
    if (!result.error) return null; //no error
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  function validateOne({ name, value }) {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: definitions[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  }

  function handleChange(state, { currentTarget: input }) {
    const errors = { ...state.errors };
    const errormsg = validateOne(input);
    if (errormsg) errors[input.name] = errormsg;
    else delete errors[input.name];
    const data = { ...state.data };
    data[input.name] = input.value;
    return { data, errors };
  }

  return { validateAll, handleChange };
}
