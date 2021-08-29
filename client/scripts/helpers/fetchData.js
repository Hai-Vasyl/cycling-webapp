const fetchData = async ({url, method = 'GET', body = {}, headers = {}}) => {
  try {
    const res = await fetch(url, {
      method, 
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    
    return res.json() 
  } catch (error) {
    console.error(`Something went wrong during server call: ${error.message}`)
  }
}

export default fetchData