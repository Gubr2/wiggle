import WiggleApi from './backend/wiggle_api'

const api = new WiggleApi()

api.updateSchoolList(2022, 'ZS', 'mk').then((data) => {
  console.log(data)
})
