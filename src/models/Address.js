const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: false
  },
  line_1: {
    type: String,
    required: true
  },
  line_2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  county: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  instructions: {
    type: String,
    required: false
  },
  default: {
    type: Boolean,
    required: false,
    default: false
  }
})

addressSchema.statics.findAllAddresses = async (customerId) => {
  // Find all addresses by customer id
  const addresses = await Address.find({ customer_id: customerId })
  return addresses
}

addressSchema.statics.findAddress = async (addressId) => {
  // Find all addresses by customer id
  const addresses = await Address.findOne({ _id: addressId })
  return addresses
}

addressSchema.statics.deleteAddress = async (addressId) => {
  // Find all addresses by customer id
  const address = await Address.deleteOne({ _id: addressId })
  return address
}

addressSchema.statics.updateAddress = async (addressDetails) => {
  const { _id } = addressDetails
  // Search for a customer by email address
  const address = await Address.updateOne({ _id }, addressDetails)
  return address
}

const Address = mongoose.model('Address', addressSchema)

module.exports = Address