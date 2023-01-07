export default (responseTime) => {
    console.log('Hi there, my response time is '+responseTime+' ms')
    const [method,url,status,resLength,resTime] = responseTime;
   console.log(responseTime)
    console.log(method)
    console.log(url)
    console.log(status)
    console.log(resLength)
    console.log(resTime)

    
}