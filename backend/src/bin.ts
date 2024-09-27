import { MongoDb } from "./db";
import { app } from "./index";

MongoDb();
app.listen(8080, () => {
  console.log("server runnig on port 8080");
});
