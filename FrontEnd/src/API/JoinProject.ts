import axios from "axios";

const JoinProject = async (id: string): Promise<boolean | string> => {
  const ID = Number(id);
  let error = await axios
    .get(`http://localhost:9000/projectrequest.php/?name=${ID}`)
    .then((res) => {
      if (res.data === "Request Already Sent.") {
        return res.data;
      } else if (res.data !== 2) {
        return "No Project Has That ID.";
      }
    });
  if (error) return error;

  error = await axios
    .post(
      "http://localhost:9000/projectrequest.php",
      { ID: ID },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.data !== "Request Sent") {
        return res.data;
      }
    });

  if (error) return error;
  return true;
};

export default JoinProject;
