const cleanData = (data: Array<any>) =>{
  var newData: Array<any> = []
  data.map(eachData =>{
     newData.push({Code: eachData.Code,Name: eachData.Name, Address: eachData.Address.Street })
  })

  return newData
}


export default {cleanData}