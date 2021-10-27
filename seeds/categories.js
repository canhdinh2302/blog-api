const mongoose = require('mongoose')
const slugify = require('slugify')
require('dotenv').config()

const Categories = mongoose.model('categories', {
  name: String,
  slug: String,
})

const categorieNames = ['ReactJs', 'Javascript', 'jQuery']

const data = categorieNames.map((name) => ({
  name,
  slug: slugify(name).toLowerCase(),
}))

const seed = async () => {
  await mongoose.connect(process.env.DATABASE_URI)
  console.log('Start insert to categories')
  try {
    await Categories.insertMany(data)
    console.log('Done')
  } catch (error) {
    console.log(error)
  }
}

Promise.all([seed()]).then(process.exit)
