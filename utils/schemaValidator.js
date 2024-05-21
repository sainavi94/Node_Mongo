const Ajv = require("ajv")
const { v4: uuidv4 } = require('uuid'); 

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const signupSchema = {
  type: "object",
  required: ["firstName", "lastName", "username", "email", "password","age","address"],
  properties: {
    firstName: {type: "string"},
    lastName: {type: "string"},
    username: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    age: {type: "integer"},
    address:{type: "string"}
  },
  additionalProperties: false,
}

const loginSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: {type: "string"},
        password: {type: "string"}
    },
    additionalProperties: false,

}

const ordersSchema = {
    type: "object",
    required: ["username", "orderId", "orderDetails"],
    properties: {
        username: {type: "string"},
        orderId: {type: "string", default:uuidv4()},
        orderDetails: { type: "array"}
    },
    additionalProperties: false,

}


const checkSignupSchema = async(payload) => {
    try {
        const validate = ajv.compile(signupSchema);
        const valid = validate(payload)
        if (!valid){
            return false;
        }
        return true;
    } catch (err) {
        return err;
    }
}

const checkLoginSchema = async(payload) => {
    try {
        const validate = ajv.compile(loginSchema);
        const valid = validate(payload)
        if (!valid){
            return false;
        }
        return true;
    } catch (err) {
        return err;
    }
}

const ordersGetSchema = async(payload) => {
    try {
        const validate = ajv.compile(ordersSchema);
        const valid = validate(payload)
        if (!valid){
            return false;
        }
        return true;
    } catch (err) {
        return err;
    }
}

module.exports = {
    checkSignupSchema,
    checkLoginSchema,
    ordersGetSchema
}