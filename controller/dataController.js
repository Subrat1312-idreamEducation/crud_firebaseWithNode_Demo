import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
  onValue,
} from "firebase/database";

//adding data to database with user defined user-id
const addData = async (req, res) => {
  const { userId, name, age, email } = req.body;
  // let result;

  try {
    const db = getDatabase();
    try {
      await set(ref(db, "usersNew/" + userId), {
        username: name,
        age: age,
        email: email,
      });
     // console.log("Data Added");
      return res.status(200).json({ msg: "Data Added Successfully" });
    } catch (error) {
      //console.log(error);
      return res.status(404).json({ msg: "Not Added" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error" });
  }
};

const addDataInFirebase = async (responseTime) => {
  const [method,url,status] = responseTime;
  console.log(method)
  console.log(url)
  console.log(status)
  // let result;

  try {
    const db = getDatabase();
    try {
      await set(ref(db, "usersNew/morgan" ), {
        method: method,
        url:url,
        status:status
        
      });
    
    } catch (error) {
      console.log(error);
     
    }
  } catch (err) {
    console.log(err)
  }
};

// getting all data present in collection
const getData = async (req, res) => {
  try {
    const db = getDatabase();
    const response = await new Promise((resolve, reject) => {
      try {
        onValue(
          ref(db, "usersNew/"),
          (snapshot) => {
            try {
              resolve(snapshot.val());
            } catch (error) {
              reject({ error: error });
            }
          },
          { onlyOnce: true }
        );
      } catch (error) {
        reject({ error: error });
      }
    });
   // console.log(response);

    if (!response) return res.status(404).json({ msg: "Not Found" });
    else if (typeof response == "object" && response["error"] != undefined)
      return res.status(400).json({ msg: "Bad Request" });
    return res.status(200).json({ response: response });
  } catch (err) {
   // console.log(err);
    return res
      .status(500)
      .json({ msg: "unable to get", error: "Internal Server Error" });
  }
};

// delete data based upon user provided id

const deleteData = async (req, res) => {
  const userId = req.params.id;
 // console.log(userId);
  const dbRef = ref(getDatabase());
  try {
    let result = await get(child(dbRef, `usersNew/${userId}`));
    console.log(result.val());
    if (result.val() && result !== null) {
      remove(ref(getDatabase(), `usersNew/${userId}/`));
      res.status(200).json({ msg: "deleted successfully" });
    }
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    return res.status(500).json({ msg: "unable to delete" });
  }
};

// update to database based upon userId

const updateData = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.body;
  const dbRef = ref(getDatabase());
  try {
    let result = await get(dbRef, `usersNew/${userId}`);
    if (result.val() && result !== null) {
      set(ref(getDatabase(), "usersNew/" + `${userId}`), {
        username: name,
        age: age,
        email: email,
      });
      return res.status(201).send("added successfully");
    }
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    //console.log(err.msg);
    return res.status(500).json({ msg: "unable to update" });
  }
};

const getDataById = async (req, res) => {
  const userId = req.params.id;
  try {
    const db = getDatabase();
    const response = await new Promise((resolve, reject) => {
      try {
        onValue(
          ref(db, `usersNew/${userId}`),
          (snapshot) => {
            try {
              resolve(snapshot.val());
            } catch (error) {
              reject({ error: error });
            }
          },
          { onlyOnce: true }
        );
      } catch (error) {
        reject({ error: error });
      }
    });
    //console.log(response);

    if (!response) return res.status(404).json({ msg: "Not Found" });
    else if (typeof response == "object" && response["error"] != undefined)
      return res.status(400).json({ msg: "Bad Request" });
    return res.status(200).json({ response: response });
  } catch (err) {
    //console.log(err);
    return res
      .status(500)
      .json({ msg: "unable to get", error: "Internal Server Error" });
  }
};
export { addData, getData, deleteData, updateData, getDataById,addDataInFirebase };
