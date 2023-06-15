const { program } = require("commander");

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Ann Dou",
//   email: "an.dou@gmail.com",
//   phone: "(342) 214-34592",
// });
// invokeAction({
//   action: "remove",
//   id: "epLq9y-wQRKfxL7R-7cFg",
// });

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
