import { getDatabase, ref, set, get, child, remove } from "firebase/database";

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
      console.log("Data Added");
      return res.status(200).json({ msg: "Data Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Not Added" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Error" });
  }
};

// getting all data present in collection
const getData = async (req, res) => {
  const dbRef = ref(getDatabase());

  try {
    let result = await get(child(dbRef, `usersNew/`));
    if (result) {
      return res.status(200).send(result.val());
    }
    console.log("Not Found");
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "unable to get" });
  }
};

// delete data based upon user provided id

const deleteData = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
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
    console.log(err.msg);
    return res.status(500).json({ msg: "unable to update" });
  }
};

const getDataById = async (req, res) => {
  const userId = req.params.id;
  const dbRef = ref(getDatabase());
  try {
    let result = await get(child(dbRef, `usersNew/${userId}/`));
    if (result.val() && result !== null) {
      return res.status(200).send(result.val());
    } 
      console.log("Not Found");
      return res.status(404).json({ msg: "Not Found" });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "unable to get" });
  }
};

export { addData, getData, deleteData, updateData, getDataById };
