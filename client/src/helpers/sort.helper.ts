/**
 * sort string array. 
 */
export function sortArray(
  c: string[], type: 'string' | 'number', ascending:boolean
){
  if(c !== undefined){
    if(type === 'string'){
      c = c.sort()
    } else if( type === 'number'){
      c = c.sort((n1,n2) => parseInt(n1) - parseInt(n2))
    }
    if(!ascending){
      c = c.reverse()
    }
  }
  return c
}

/**
 * no_doc and kind can be sorted using this function. 
 */
function convert_no_doc_to_number(c:string){
  if(c === '中間'){
    return 98
  } else if( c=== '期末'){
    return 99
  } else if( c === undefined){
    return 0
  } else if( c === '問題'){
    return 1001 
  } else if( c === '解答'){
    return 1002
  } else {
    return parseInt(c.slice(1,-1))
  }
}

/**
 * sort array which element belonging to no_doc of file_code table. 
 */
export function sortNoDoc(
  c: string[], ascending:boolean
){
  if(c !== undefined){
    c = c.sort((n1,n2) => {
      let v1 = convert_no_doc_to_number(n1)
      let v2 = convert_no_doc_to_number(n2)
      return v1 - v2
    })
    
    if(!ascending){
      c = c.reverse()
    }
  }
  return c
}
/**
 * grouping function. 
 */
export function groupby(items:any[], key:string){
  return items.reduce((obj, v) => {
    if(!obj[v[key]]){
      obj[v[key]] = []
    }
    obj[v[key]].push(v)
    return obj
  }, {})
}

/**
 * grouping function version deep.
 */
export function groupbyDeep(
  items:any[], key1:string, key2: string
){
  return items.reduce((obj, v) => {
    if(!obj[v[key1][key2]]){
      obj[v[key1][key2]] = []
    }
    obj[v[key1][key2]].push(v)
    return obj
  }, {})
}

/**
 * dict object sorting with value.
 */
export function sortValue(
  c: any[], index: string, ascending:boolean
){
  if(c !== undefined){
    c = c.sort((n1,n2) => n1[index] - n2[index])
    if(!ascending){
      c = c.reverse()
    }
  }
  return c
}

/**
 * dict object sorting with string.
 */
export function sortString(
  c: any[], index: string, ascending:boolean
){
  if(c !== undefined){
    c = c.sort((n1,n2) => {
      if(n1[index] > n2[index]){
        return 1
      } else if (n1[index] < n2[index]){
        return -1
      } else {
        return 0
      }
    })
    if(!ascending){
      c = c.reverse()
    }
  }
  return c
}

/**
 * dict object sorting with date.
 */
export function sortDate(
  c:any[], index: string, ascending:boolean
){
  if(c !== undefined){
    c = c.sort((n1,n2) =>{
      return new Date(n1[index]).getTime() - new Date(n2[index]).getTime()
    })
    if(!ascending){
      c = c.reverse()
    } 
  }
  return c
}


export function sortLearnYearTerm(
  c:any[], ascending:boolean
){
  if(c !== undefined){
    c = c.sort((n1,n2)=>{
      let year1: number = n1.learn_year
      let year2: number  = n2.learn_year
      let term1 = n1.learn_term === 'pre' ? 0 : 0.5
      let term2 = n2.learn_term === 'pre' ? 0 : 0.5
      let num1 = year1 + term1
      let num2 = year2 + term2
      return num1 - num2 
    })
    if(!ascending){
      c = c.reverse()
    }
  }
  return c
}