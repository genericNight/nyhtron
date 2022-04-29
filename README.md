# What is nyhtron?

nyhtron is a json based database solution designed to work on low-level hardware.
nyhtron works with basic identifiers and creates an intiutive experience, manage multiple databases in one go using one module and as simply as declaring a variable.


# **Initilization**


well, first install nyhtron running; `npm i nyhtron` 
then head over to your project and define the module;
```js
const { Database } = require('nyhtron')
```
after that you can create a new database;
```js
const items = new Database('items.json')
```
the items variable will be used to access all the data in the items.json directory.
 

# **Working with singular data**

we will use our previous items database to give the examples.
```js
items.set('key', 'value') //set will overwrite the previous values.
items.add('key', 1) //add will add a number or string.
```
below is whats used for fetching or getting a value
```js
items.get('kay')
// will return undefined since kay does not exist.
//so instead run;
if (items.has('key')) {
    items.get('kay')
} else {
    return 'no item to get.'
}
```


# **Working with arrays**

use the `.push` and `.arrayFetch` methods.
```js
let obj = {
    name: "asd",
    time: "hm"
}
items.push('object', obj)
//.push acts like the .add method.
//it will add the values that were changed and the values that werent will remain same.

db.objectFetch('Object', 'key'); /* key: "value1" */
db.arrayFetch('Array', 1); /* element2 */
```


# **Other methods**

```js
db.remove('data'); // Removes the data from the database
db.delete('Array', 'element3'); // Removing something from an array using value/index
db.deleteKey('object', 'key'); // Deletes the provided key from the given object
db.deleteEach('data'); // Deletes each data that starts with the given parameter
db.clear(); // Clears everything from the database
db.destroy(); // Delete the database file (And Clear All Data)
db.fetchAll(); // Fetches all the data in the database
db.all(); // Fetches everything in the database
db.objectFetch('Object', 'key'); /* key: "value1" */
db.arrayFetch('Array', 1); /* element2 */
db.setBackup('backup.json') // Set "backup.json" as the backup file
db.loadBackup(); // Loads the backup from the backup file (setBackup) function
```
