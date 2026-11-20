window.WBPSCStorage={
  get(key,fallback=null){try{const value=localStorage.getItem(key);return value===null?fallback:JSON.parse(value)}catch(error){console.warn("Storage read failed",key,error);return fallback}},
  set(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(error){console.warn("Storage write failed",key,error);return false}},
  remove(key){try{localStorage.removeItem(key);return true}catch(error){console.warn("Storage remove failed",key,error);return false}}
};
