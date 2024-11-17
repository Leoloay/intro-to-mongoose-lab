const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

const prompt = require("prompt-sync")()

const CRM = require("./models/CRM.js")

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
  })
}

connect()

// const username = prompt("What is your name? ")
// console.log(`Your name is ${username}`)

console.log("Welcome to CRM")

const init = async () => {
  console.log("What would you like to do?")
  console.log("\n1. Create a customer?")
  console.log("2. View all customers")
  console.log("3. Update a customer")
  console.log("4. Delete a customer")
  console.log("5. quit\n")
  const action = prompt("Number of action to run:")
  await runQueries(action)
}

const createCRM = async () => {
  CRMname = prompt("what is the customer's name?")
  CRMage = prompt("what is the customer's age?")

  const CRMData = {
    name: CRMname,
    age: CRMage,
  }

  const crm = await CRM.create(CRMData)
}

const viewCRM = async () => {
  const customers = await CRM.find()
  console.log("Customers:", customers)
}

const updateCRM = async () => {
  const id = prompt("Enter the customer ID to update: ")
  const updatedName = prompt("Enter the new name: ")
  const updatedAge = prompt("Enter the new age: ")

  const updatedCustomer = await CRM.findByIdAndUpdate(id, {
    name: updatedName,
    age: updatedAge,
  })

  console.log("Customer updated:", updatedCustomer)
}

const deleteCRM = async () => {
  const id = prompt("Enter the customer ID to delete: ")
  await CRM.findByIdAndDelete(id)
  console.log("Customer deleted.")
}

const quitCRM = async () => {
  console.log("Exiting CRM...")
}

const runQueries = async (action) => {
  switch (action) {
    case "1":
      await createCRM()
      init()
      break
    case "2":
      await viewCRM()
      init()
      break
    case "3":
      await updateCRM()
      init()
      break
    case "4":
      await deleteCRM()
      init()
      break
    case "5":
      await quitCRM()
      console.log("You have been exited from CRM app")
      break
  }
}

init()
