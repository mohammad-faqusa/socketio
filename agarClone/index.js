function addBinary(a,b) {
    let temp = a + b ; 
    let arr = [] ; 
    
    if(temp === 0)
      return '0'
    
    while(temp >= 1) {
      if (temp % 2 === 0)
        arr.push('0')
      else 
        arr.push('1')
      temp = Math.floor(temp/2); 


    }
    return arr.reverse().join(''); 
  }

  console.log(addBinary(125 , 4 ))