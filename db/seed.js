import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    // Pick a random index from the chars string
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
}

async function seed() {
  //gen 3 folders
  for (let i = 1; i <= 3; i++) {
    const folderSQL = `
  INSERT INTO folders
  (name)
  VALUES ($1)
  RETURNING *;
  `;
    try {
      const res = await db.query(folderSQL, [generateRandomString(15)]);
      //gen 5 files per folder
      for (let j = 1; j <= 5; j++) {
        const fileSQL = `
  INSERT INTO files
  (name, size, folder_id)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
        try {
          const res = await db.query(fileSQL, [
            generateRandomString(15),
            Math.round(Math.random() * 20),
            i,
          ]);
          console.log(res.rows);
        } catch (err) {
          console.log(err);
        }
      }
      console.log(res.rows);
    } catch (err) {
      console.log(err);
    }
  }
}
