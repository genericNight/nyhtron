const fs = require('fs');
const load = (file) => JSON.parse(fs.readFileSync(file, 'utf-8')); 
const write = (file, data) =>  fs.writeFileSync(file, JSON.stringify(data, null, 4));
const extension = (filePath) => { let parts = filePath.split('.'); return parts[parts.length - 1]; }
let backup;
const Backupadd = (data) => { if(backup !== undefined) { fs.writeFileSync(backup, JSON.stringify(data, null, 4)); } }
class Database {
  constructor(file) {
    this.file = file || 'database.json'
    if(this.file === 'database.json') {
      try { load(this.file); } catch { write(this.file, {}); }
    } else {
	  if (!this.file.includes('./')) this.file = './' + this.file
      if(extension(this.file) !== 'json') throw Error("[database issue!] - the database file must be set up with the .json prefix, please change this and continue.")
      try { load(this.file); } catch { write(this.file, {}); }
    }
  }

  setBackup(filePath) {
    if (!filePath) throw Error("[database issue!] a .json file must be mentioned for backups");
    if (extension(filePath) !== "json") throw Error("[database issue!] the backup file must end with .json");
    if (!filePath.includes('./')) filePath = './' + filePath
    backup = filePath;
    try { load(backup); } catch { write(backup, {}); }
    return; 
  }
  loadBackup() {
    if (backup === undefined) throw Error("[database issue!] can't find a backup || a file to load");
    write(this.file, load(backup));
    return;
  }
  set(data, value) {
    
    if (!data) throw Error("[database issue!] no data to set");
    if (value == 0) {
      let fileData = load(this.file)
      fileData[data] = value;
      write(this.file, fileData);
        Backupadd(fileData);
        return;
  
    }
    if (!value) throw Error("[database issue!] no value to set");
	let fileData = load(this.file)
	fileData[data] = value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
  } 
  remove(data) {
    if(!data) throw Error("[database issue!] no value to remove")
    let fileData = load(this.file)
    if(!fileData[data]) throw Error("[database issue!] mentioned data isn't in directory or cannot be reached")
    fileData[data] = undefined;
    write(this.file, fileData);
    Backupadd(fileData);
    return;
  }
  add(data, value) {
    if (!data) throw Error("[database issue!] no data to add");
	if (value == 0) {
    if(typeof value == "number") {
      let fileData = load(this.file)
      if (fileData[data] === undefined) return this.set(data, value);
      if(isNaN(fileData[data])) return this.set(data, value);
      fileData[data] = fileData[data] + value;
      write(this.file, fileData);
        Backupadd(fileData);
        return;
      } else {
      let fileData = load(this.file)
      if (fileData[data] === undefined) return this.set(data, value);
      if(isNaN(fileData[data])) return this.set(data, value);
      fileData[data] = fileData[data] + value;
      write(this.file, fileData);
        Backupadd(fileData);
        return;
      }
    }
  
    if (!value) throw Error("[database issue!] no value to add");
	if(typeof value == "number") {
	let fileData = load(this.file)
	if (fileData[data] === undefined) return this.set(data, value);
	if(isNaN(fileData[data])) return this.set(data, value);
	fileData[data] = fileData[data] + value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
	} else {
	let fileData = load(this.file)
	if (fileData[data] === undefined) return this.set(data, value);
	if(isNaN(fileData[data])) return this.set(data, value);
	fileData[data] = fileData[data] + value;
	write(this.file, fileData);
    Backupadd(fileData);
    return;
	}
  }



  subtract(data, value) {
    if (!data) throw Error("[database issue!] No data to subtract");
    if (!value) throw Error("[database issue!] No value to subtract");
    if (typeof value !== "number") throw Error(`[database issue!] The value to substract must be a number, received type: ${typeof value}`);
    let fileData = load(this.file)
    if (file[data] === undefined) return this.set(data, value);
    if(isNaN(file[data])) return this.set(data, value);
    fileData[data] = fileData[data] - value;
    write(this.file, fileData);
    Backupadd(fileData);
    return;
  }


  deleteEach(data) {
    if (!data) throw Error("[database issue!] No data to deleteEach")
    let fileData = load(this.file)
    let item = Object.keys(fileData)
    if (item === '') throw Error(nothingToDeleteeach)
    item = item.filter((Data) => Data.includes(data));
    item.forEach((Data) => {
      this.remove(Data)
    });
    return;
  }


  push(array, value) {
    if (!array) throw Error("[database issue!] No array to push")
    if (!value) throw Error("[database issue!] No value to push to the array")
    let fileData = load(this.file)
    if (fileData[array] && Array.isArray(fileData[array])) {
      fileData[array].push(value)
      write(this.file, fileData)
    } else if (!fileData[array]) {
      this.set(array, [value])
    }
    return
  }



  delete(array, index) {
    if (!array) throw Error("[database issue!] No array to index/value delete")
    if (index === undefined) throw Error("[database issue!] No index/value to delete from the array")
    let fileData = load(this.file)
    if (!fileData[array] && !Array.isArray(fileData[array])) throw Error("[database issue!] The array to index/value delete dosen't exist or it's not array")
    if (typeof index === "number") {
      fileData[array].splice(index, 1)
      write(this.file, fileData)
      } else if(isNaN(index)) {
        if(fileData[array].includes(index)) {
          fileData[array].splice(fileData[array].indexOf(index), 1)
          write(this.file, fileData)
       } else { throw Error("[database issue!] Unable to find a value with the provided index/value to delete"); }
      }
      return;
  }



  deleteKey(object, key) {
    if (!object) throw Error("[database issue!] No object to key delete");
    if (!key) throw Error("[database issue!] No key to delete from the object");
    let fileData = load(this.file);
    if (!fileData[object]) throw Error("[database issue!] The object to delete key dosen't exist in the database");
    if (typeof fileData[object] !== 'object') throw Error("[database issue!] The provided object to key delete is not an object in the database");
    delete fileData[object][key];
    write(this.file, fileData);
    return;
  }



  has(data) {
    if (!data) throw Error("[database issue!] No data to has function");
    let fileData = load(this.file)
    if (!fileData[data]) return false;
    if (fileData[data]) return true;
  }



  clear() {
    write(this.file, {});
    return;
  }




  fetchAll() {
    return load(this.file);
  }




  all() {
    return load(this.file);
  }


  destroy() {
    fs.unlinkSync(this.file);
    return;
  }



  fetch(data) {
    if (!data) throw Error("[database issue!] No data to fetch")
    let fileData = load(this.file)
    if(!fileData[data]) fileData[data] = null
    return fileData[data]
  }



  get(data) {
    if (!data) throw Error("[database issue!] No data to get")
    let fileData = load(this.file)
    if(fileData[data] == 0) {
      fileData[data] = 0
      return fileData[data]
    }
    if(!fileData[data]) fileData[data] = null
    return fileData[data]
  }



  objectFetch(object, key) {
    let fileData = load(this.file)
    if (!object) throw Error("[database issue!] No object to object fetch")
    if (!key) throw Error("[database issue!] No key to object fetch")
    if (!fileData[object]) throw Error("[database issue!] The object to object fetch dosen't exist in the database");
    if (typeof fileData[object] !== 'object') throw Error("[database issue!] The provided object to object fetch is not an object in the database");
    if(!fileData[object][key]) fileData[object][key] = null
    return fileData[object][key]
  }



  arrayFetch(array, number) {
    let fileData = load(this.file)
    if (!array) throw Error("[database issue!] No array to array fetch")
    if (!number && number != 0) throw Error("[database issue!] No index/number to array fetch")
    if (!fileData[array] && !Array.isArray(fileData[array])) throw Error("[database issue!] The array to fetch dosen't exist or it's not array")
    if (typeof number !== "number" && value !== 0) throw Error(`[database issue!] The number/index to array fetch must be a number, received type: ${typeof value}`);
    if(!fileData[array][number]) fileData[array][number] = null
    return fileData[array][number];
  }



  math(data, operator, value) {
    if (!data) throw Error("[database issue!] No data to math")
    if (!operator) throw Error("[database issue!] No operator to math")
    if (!value) throw Error("[database issue!] No value to math")
    if (typeof value !== "number") throw Error(`[database issue!] The value to math must be a number, received type: ${typeof value}`);
    let fileData = load(this.file)
    if (operator === "-") {
      let i = fileData[data] - value;
      return i
    } else if (operator === "+") {
      let ii = fileData[data] + value;
      return ii
    } else if (operator === "*") {
      let iii = fileData[data] * value;
      return iii
    } else if (operator === "/") {
      let iiii = fileData[data] / value;
      return iiii
    } else {
      throw Error("[database issue!] unvaild operator to math, you can use only (-, +, *, /) (math) function")
    }
  }
}

module.exports = { Database };